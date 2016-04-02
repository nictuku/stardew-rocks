package stardb

import (
	"encoding/json"
	"fmt"

	"github.com/nictuku/stardew-rocks/parser"
	"gopkg.in/mgo.v2/bson"
)

type FarmInfo struct {
	parser.SaveGame
}

func FarmInfoFromSaveGame(sg *parser.SaveGame) (*FarmInfo, error) {
	return &FarmInfo{*sg}, nil
}

func UpdateFarmInfo(id bson.ObjectId, fi *FarmInfo) error {
	_, err := FarmInfoCollection.Upsert(bson.M{"_id": id}, fi)
	return err
}

func FarmInfoJSON(id string) ([]byte, error) {
	if !bson.IsObjectIdHex(id) {
		return nil, fmt.Errorf("invalid farm id")
	}
	var fi *FarmInfo
	if err := FarmInfoCollection.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&fi); err != nil {
		return nil, err
	}
	return json.Marshal(fi)
}
