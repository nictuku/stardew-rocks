package stardb

import (
	"fmt"

	"github.com/nictuku/stardew-rocks/parser"
	"gopkg.in/mgo.v2/bson"
)

type FarmHistory struct {
	// FarmID is a foreign key to the farms collection. Not unique in this
	// collection since each farm will have several entries, one for each
	// save game.
	FarmID bson.ObjectId `json:"-"`
	Ts     int           // timestamp for this save game

	*parser.SaveGame
}

func FarmHistoryFromSaveGame(id bson.ObjectId, sg *parser.SaveGame, ts int) (*FarmHistory, error) {
	return &FarmHistory{id, ts, sg}, nil
}

func InsertFarmHistory(cols *CollectionsHolder, id bson.ObjectId, fi *FarmHistory) error {
	_, err := cols.FarmHistory.Upsert(bson.M{"farmid": id, "ts": fi.Ts}, fi)
	// log.Printf("%v %v : inserted? %#v", id.Hex(), fi.Ts, changeInfo)
	return err
}

func GetFarmHistory(cols *CollectionsHolder, id string) ([]*FarmHistory, error) {
	if !bson.IsObjectIdHex(id) {
		return nil, fmt.Errorf("invalid farm id")
	}
	var fis []*FarmHistory
	err := cols.FarmHistory.Find(bson.M{"farmid": bson.ObjectIdHex(id)}).All(&fis)
	return fis, err
}
