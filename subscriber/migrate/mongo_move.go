package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"io/ioutil"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/stardb"
	"github.com/nictuku/stardew-rocks/view"
)

func parseTime(t string) time.Time {
	i, err := strconv.ParseInt(t, 10, 64)
	if err != nil {
		panic(err)
	}
	return time.Unix(i, 0)
}

func prevUpload(farmid bson.ObjectId, uniqueIDForThisGame int, playerName, farmName string, ts time.Time) (existing bool, err error) {

	q := stardb.GFS.Find(bson.M{
		"filename": fmt.Sprintf("/screenshot/%v/%d.xml", farmid.Hex(), ts.Unix()),
	})
	n, err := q.Count()
	if err != nil {
		if err == mgo.ErrNotFound {
			log.Println("not found", err)
			return false, nil
		}
		return false, err
	}

	return n > 0, nil
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <xml save file>`", os.Args[0])
	}
	farmMap := parser.LoadFarmMap()

	log.Printf("Processing %v", os.Args[1])
	sg, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	base := filepath.Base(os.Args[1])
	base = strings.TrimSuffix(base, ".xml")
	spl := strings.Split(base, "-")
	if len(spl) != 2 {
		log.Fatal("unexpected split for %v, expected 2 got %v", base, len(spl))
	}
	prevTimestamp := parseTime(spl[1])

	gameSave, err := parser.ParseSaveGame(sg)
	if err != nil {
		log.Fatal(err)
	}
	farm, _, err := stardb.FindFarm(stardb.FarmCollection, gameSave.UniqueIDForThisGame, gameSave.Player.Name, gameSave.Player.FarmName)
	if err != nil {
		log.Fatal(err)
	}

	found, err := prevUpload(farm.InternalID, gameSave.UniqueIDForThisGame, gameSave.Player.Name, gameSave.Player.FarmName, prevTimestamp)
	if err != nil {
		log.Fatal(err)
	}
	if found {
		log.Fatal("update with the same save date already found")
	}

	// GridFS XML save file write.
	buf, err := ioutil.ReadAll(sg)
	if err != nil {
		log.Fatal(err)
	}
	if err := stardb.WriteSaveFile(farm, buf, prevTimestamp); err != nil {
		log.Fatal("write save file:", err)
	}
	// The save file is the most critical and it's been updated, so we should be fine.
	if err := stardb.UpdateFarmTime(farm.InternalID, prevTimestamp); err != nil {
		log.Fatal("update farm time:", err)
	}

	// GridFs screenshot write.
	fs, err := stardb.NewScreenshotWriter(farm, prevTimestamp)
	if err != nil {
		log.Fatal("Error writing grid screenshot:", err)
	}

	if err := view.WriteImage(farmMap, gameSave, fs); err != nil {
		log.Fatal(err)
		fs.Close()
		return
	}
	fs.Close()
	log.Printf("Wrote grid map file %v", farm.ScreenshotPath())
}
