package main

import (
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"labix.org/v2/mgo/bson"

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
	farmid, existing, err := stardb.FindFarm(stardb.FarmCollection, gameSave.UniqueIDForThisGame, gameSave.Player.Name, gameSave.Player.FarmName)
	if err != nil {
		log.Fatal(err)
	}
	if existing {
		log.Println("already existing:", farmid.ID.Hex())
		return
	}

	// GridFS XML save file write.
	buf, err := ioutil.ReadAll(sg)
	if err != nil {
		log.Fatal(err)
	}
	if err := stardb.WriteSaveFile(farmid, buf); err != nil {
		log.Fatal("write save file:", err)
	}
	// The save file is the most critical and it's been updated, so we should be fine.
	if err := stardb.FarmCollection.Update(bson.M{"_id": farmid.ID}, bson.M{"savetime": prevTimestamp}); err != nil {
		log.Fatal("update farm time:", err)
	}

	// GridFs screenshot write.
	fs, err := stardb.NewScreenshotWriter(farmid)
	if err != nil {
		log.Fatal("Error writing grid screenshot:", err)
	}

	if err := view.WriteImage(farmMap, gameSave, fs); err != nil {
		log.Fatal(err)
		fs.Close()
		return
	}
	fs.Close()
	log.Printf("Wrote grid map file %v", farmid.ScreenshotPath())
}
