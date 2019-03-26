package main

// pubsub based on https://hackernoon.com/communicating-go-applications-through-redis-pub-sub-messaging-paradigm-df7317897b13

import (
	"log"
	"net/http"
	"sync"

	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
)

var (
	gStore      *Store
	gPubSubConn *redis.PubSubConn
	gRedisConn  = func() (redis.Conn, error) {
		return redis.Dial("tcp", ":6379")
	}
    upgrader = websocket.Upgrader{}
)

func init() {
	gStore = &Store{
		Users: make([]*User, 0, 1),
	}
}

// User holds a websocket connection and a subscription topic
type User struct {
	Topic string
	conn  *websocket.Conn
}

// Store holds the collection of users connected through websocket
type Store struct {
	Users []*User
	sync.Mutex
}

// Message gets exchanged between users through redis pub/sub messaging
// Users may have websocket connections to different nodes and stored in
// different instances of this application
type Message struct {
	Content string `json:"content"`
	Topic   string `json:"topic"`
}

func (c *Core) newUser(conn *websocket.Conn) *User {
	u := &User{
		Topic: "",
		conn:  conn,
	}

	c.ClientStore.Lock()
	defer c.ClientStore.Unlock()

	s.Users = append(s.Users, u)
	return u
}

func main() {
	gRedisConn, err := gRedisConn()
	if err != nil {
		panic(err)
	}
	defer gRedisConn.Close()

	gPubSubConn = &redis.PubSubConn{Conn: gRedisConn}
    for _, lot := range gLots {
	    if err := gPubSubConn.Subscribe(lot); err != nil {
		    panic(err)
	    }
    }
	defer gPubSubConn.Close()
}

func (c *Core) wsHandler(ctx echo.Context) {
	conn, err := c.upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		log.Printf("upgrader error %s\n" + err.Error())
		return err
	}
	u := c.newUser(conn)
	log.Printf("user joined\n")

	for {
		var m Message

		if err := u.conn.ReadJSON(&m); err != nil {
			log.Printf("error on ws. message %s\n", err)
		}

        if m.Content == "subscribe" {
            u.Topic = m.Topic
        } else {
		    if c, err := gRedisConn(); err != nil {
                log.Printf("error on redis conn. %s\n", err)
		    } else {
                c.Do("PUBLISH", m.Topic, string(m.Content))
		    }
        }
	}
}

func deliverMessages() {
	for {
		switch v := gPubSubConn.Receive().(type) {
		case redis.Message:
			gStore.findAndDeliver(v.Channel, string(v.Data))
		case redis.Subscription:
			log.Printf("subscription message: %s: %s %d\n", v.Channel, v.Kind, v.Count)
		case error:
			log.Println("error pub/sub on connection, delivery has stopped")
			return
		}
	}
}

func (s *Store) findAndDeliver(topic string, content string) {
	m := Message{
        Topic:   topic,
		Content: content,
	}
	for _, u := range s.Users {
		if u.Topic == topic {
			if err := u.conn.WriteJSON(m); err != nil {
				log.Printf("error on message delivery through ws. e: %s\n", err)
			} else {
				log.Printf("user found at our store, message sent\n")
			}
		}
	}

	log.Printf("topic %s not found at our store\n", topic)
}
