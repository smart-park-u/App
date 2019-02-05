package main

import (
	"net/http"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo"
)

type Core struct {
	DB *sql.DB
}

func main() {
	c := &Core{
		DB: dbConn(),
	}

	e := echo.New()
	e.GET("/lots/:lot", c.getLotInfo)
	e.PUT("/spots/:spotOccupied", c.updateSpot)
	e.Logger.Fatal(e.Start(":12547"))
	defer c.DB.Close()
}

type ParkingSpot struct {
    lot_name string
    spot_id string
    is_occupied bool
    spot_type string
    location string
}

//Method used to handle database connection
func dbConn() (db *sql.DB) {
    dbDriver := "mysql"
    dbUser := "appuser"
    dbPass := "password"
    dbName := "smartparkuDB"
    db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
    if err != nil {
        panic(err.Error())
    }
    return db
}

//Method that returns every parking spot type and the number of available spots for each type in the requested lot that the user clicks on in their application.
func (c *Core) getLotInfo(ctx echo.Context) error {
	lot := ctx.Param("lot")
	inqForm, err := c.DB.Query(fmt.Sprintf("SELECT COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'F' THEN 1 END) as openF, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'E' THEN 1 END) as openE, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'R' THEN 1 END) as openR, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'SB' THEN 1 END) as openSB, COUNT(CASE WHEN lot_name = '%s' && is_occupied = 0 && spot_type = 'Handicap' THEN 1 END) as openHandicap FROM parking_lot;", lot, lot, lot, lot, lot))
	if err != nil{
		panic(err.Error())
	}
	var openF, openE, openR, openSB, openHandicap int
	inqForm.Next()
	if err := inqForm.Scan(&openF, &openE, &openR, &openSB, &openHandicap); err != nil{
		fmt.Println(err)
	}
	//formats the response string for the application to be able to parse and use on screen.
	resp := map[string]int{"F": openF, "E": openE, "R": openR, "SB": openSB, "Handicap": openHandicap}
	return ctx.JSON(http.StatusOK, resp)
}

//Method used to update a specific spot to whether it's occupied or not.
func (c *Core) updateSpot(ctx echo.Context) error {
	spotOccupied := ctx.Param("spotOccupied")
	spotID := ctx.Body("spotID")
	location := ctx.Body("location")
	lotName := ctx.Body("lotName")
	if spotOccupied == "1"{
		updForm, err := c.DB.Prepare("UPDATE parking_lot SET is_occupied = 1 WHERE spot_id = ? && lot_name = ? && location = ?")
		if err != nil {
			panic(err.Error())
		}
	}
	if spotOccupied == "0"{
		updForm, err := c.DB.Prepare("UPDATE parking_lot SET is_occupied = 0 WHERE spot_id = ? && lot_name = ? && location = ?")
		if err != nil {
			panic(err.Error())
		}
	}

                updForm.Exec(spotID, lotName, location)
		resp :=  spotID + " has been updated in " + lotName + " lot on the following campus: " + location
	return ctx.String(http.StatusOK, resp)
}
