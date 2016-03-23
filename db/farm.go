package stardb

import (
	"time"

	"labix.org/v2/mgo"
)

type Farm struct {
	Id         string
	Name       string
	Farmer     string
	Likes      int
	LastUpdate time.Time
	Thumbnail  string
}

func FarmID(c *mgo.Collection, uniqueIDForThisGame int, playerName, farmName string) (int64, error) {
	return 0, nil
}
