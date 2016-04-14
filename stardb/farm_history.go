package stardb

import (
	"fmt"
	"time"

	"github.com/nictuku/stardew-rocks/parser"
	"gopkg.in/mgo.v2/bson"
)

type FarmHistory struct {
	 // FarmID is a foreign key to the farms collection. Not unique in this
	 // collection since each farm will have several entries, one for each
	 // save game.
	FarmID bson.ObjectId `json:"-"`
	Ts     int64         // timestamp for this save game

	*parser.SaveGame
}

func FarmHistoryFromSaveGame(id bson.ObjectId, sg *parser.SaveGame, ts time.Time) (*FarmHistory, error) {
	return &FarmHistory{id, ts.Unix(), sg}, nil
}

func InsertFarmHistory(id bson.ObjectId, fi *FarmHistory) error {
	return FarmHistoryCollection.Insert(fi)
}

func GetFarmHistory(id string) ([]*FarmHistory, error) {
	if !bson.IsObjectIdHex(id) {
		return nil, fmt.Errorf("invalid farm id")
	}
	var fis []*FarmHistory
	err := FarmHistoryCollection.Find(bson.M{"farmid": bson.ObjectIdHex(id)}).All(&fis)
	return fis, err
}
