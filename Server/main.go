package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
)

type Core struct {
	gStore *Store
	DB          *sql.DB
	Lots        []string
	gPubSubConn  *redis.PubSubConn
	gRedisConn   func() (redis.Conn, error)
	Upgrader    websocket.Upgrader
}

type lotUpdate struct {
	LotName       string `json:"lotName"`
	SpotsOccupied int    `json:"spotsOccupied"`
}

type lotUpdates struct {
	Updates []lotUpdate `json:"lotUpdates"`
}

func main() {
	c := &Core{
		gStore: &Store{
			Users: make([]*User, 0, 1),
		},
		DB: dbConn(),
		Lots: []string{"west_linhfield", "south_gatton", "greenhouse"},
		gRedisConn: func() (redis.Conn, error) {
			return redis.Dial("tcp", ":6379")
		},
		Upgrader: websocket.Upgrader{},
	}

	redisConn, err := c.gRedisConn()
	if err != nil {
		panic(err)
	}
	defer redisConn.Close()

	c.gPubSubConn = &redis.PubSubConn{Conn: redisConn}
	for _, lot := range c.Lots {
		if err := c.gPubSubConn.Subscribe(lot); err != nil {
			panic(err)
		}
	}
	defer c.gPubSubConn.Close()

	go c.deliverMessages()

	e := echo.New()
	e.GET("/lots/:lot", c.getLotInfo)
	e.GET("/ws", c.wsHandler)
	e.POST("/update-lots", c.updateLots)

	e.Logger.Fatal(e.Start(":12547"))
	defer c.DB.Close()
}

//Method used to handle database connection
func dbConn() (db *sql.DB) {
	dbDriver := "mysql"
	dbUser := "appuser"
	dbPass := os.Getenv("MYSQL_PASSWORD")
	dbName := "smartparkuDB"
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}
	return db
}

//Method that returns every parking spot type and the number of available spots for each type in the requested lot that the user clicks on in their application.
func (c *Core) getLotInfo(ctx echo.Context) error {
	fmt.Println("received request to getLotInfo")
	lot := ctx.Param("lot")
	//inqForm, err := c.DB.Query(fmt.Sprintf("SELECT COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'F' THEN 1 END) as openF, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'E' THEN 1 END) as openE, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'R' THEN 1 END) as openR, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'SB' THEN 1 END) as openSB, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'Handicap' THEN 1 END) as openHandicap FROM parking_lot;", lot, lot, lot, lot, lot))
	inqForm, err := c.DB.Query(fmt.Sprintf("SELECT COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 THEN 1 END) as open FROM parking_lot;", lot))
	if err != nil{
		fmt.Println(err)
		panic(err.Error())
	}
	//var openF, openE, openR, openSB, openHandicap int
	var open int
	inqForm.Next()
	if err := inqForm.Scan(&open); err != nil{
		fmt.Println(err)
	}
	//formats the response string for the application to be able to parse and use on screen.
	//resp := map[string]int{"F": openF, "E": openE, "R": openR, "SB": openSB, "Handicap": openHandicap}
	resp := map[string]int{"total": open}
	return ctx.JSON(http.StatusOK, resp)
}

func (c *Core) updateLots(ctx echo.Context) error {
	response := map[string]string{}
	payload := new(lotUpdates)
	if err := ctx.Bind(payload); err != nil {
		response["status"] = fmt.Sprintf("bad arguments: %s", err)
		return ctx.JSON(http.StatusBadRequest, response)
	}

	//build the query string
	for _, update := range payload.Updates {
		resetQuery := fmt.Sprintf("UPDATE parking_lot SET is_occupied = 0 WHERE lot_name = '%s'; ", update.LotName)
		updForm, err := c.DB.Prepare(resetQuery)
		if err != nil {
			panic(err.Error())
		}
		updForm.Exec(resetQuery)

		updateQuery := fmt.Sprintf("UPDATE parking_lot SET is_occupied = 1 WHERE lot_name = '%s' ORDER BY spot_id ASC LIMIT %d; ", update.LotName, update.SpotsOccupied)
		updForm, err = c.DB.Prepare(updateQuery)
		if err != nil {
			panic(err.Error())
		}
		updForm.Exec(updateQuery)
	}

	return ctx.String(http.StatusOK, "ok")
}
