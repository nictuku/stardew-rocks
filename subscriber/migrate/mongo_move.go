package main

import (
	"log"
	"os"

	"io/ioutil"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/stardb"
	"github.com/nictuku/stardew-rocks/view"
)

func main() {
	if len(os.Args) != 3 {
		log.Fatalf("Expected `%v <xml save file> <output.png>`", os.Args[0])
	}
	farmMap := parser.LoadFarmMap()

	log.Printf("Processing %v", os.Args[1])
	sg, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	gameSave, err := parser.ParseSaveGame(sg)
	if err != nil {
		log.Fatal(err)
	}
	farmid, err := stardb.FindFarm(stardb.FarmCollection, gameSave.UniqueIDForThisGame, gameSave.Player.Name, gameSave.Player.FarmName)
	if err != nil {
		log.Fatal(err)
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
	if err := stardb.UpdateFarmTime(stardb.FarmCollection, farmid.ID); err != nil {
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
