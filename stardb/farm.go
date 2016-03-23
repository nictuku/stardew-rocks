package stardb

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Farm struct {

	// Fields with  `json:"-"` are ommited for web display

	ID         bson.ObjectId `bson:"_id,omitempty" json:"-"`
	UniqueID   int           `json:"-"`
	Name       string
	Farmer     string
	Likes      int
	LastUpdate time.Time `json:"-"`
	Thumbnail  string
}

func FarmsJSON() ([]byte, error) {
	var result []*Farm

	if err := FarmCollection.Find(nil).Limit(20).All(&result); err != nil {
		return nil, err
	}
	for _, farm := range result {
		farm.Thumbnail = fmt.Sprintf("/screenshot/%v.png", farm.ID.Hex())
	}
	return json.Marshal(result)
}

func FindFarm(c *mgo.Collection, uniqueIDForThisGame int, playerName, farmName string) (*Farm, error) {
	farm := &Farm{
		Name:     farmName,
		Farmer:   playerName,
		UniqueID: uniqueIDForThisGame,
	}
	ret := &Farm{}
	if err := c.Find(farm).One(&ret); err != nil {
		log.Println("not found", err)
		farm.ID = bson.NewObjectId()
		farm.LastUpdate = time.Now()
		if err := c.Insert(farm); err != nil {
			log.Println("could not insert", err)
			return nil, err
		}
		log.Println("insert ok", farm.ID.String())
		return farm, nil
	}
	log.Printf("found ok %#v", ret)
	return ret, nil
}
