// This program looks at all save games stored in the database and generates
// new screenshots with the latest renderer.
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/stardb"
	"github.com/nictuku/stardew-rocks/view"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmMap := parser.LoadFarmMap()
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)
	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		for _, savetime := range farm.SaveTimes() {
			gfile := stardb.SaveGamePathInt(farm.InternalID.Hex(), savetime)
			sg, err := stardb.GFS.Open(gfile)
			if err != nil {
				log.Fatal(err)
			}
			screenFile := farm.ScreenshotPathByTime(savetime)
			f, err := stardb.GFS.Create(screenFile)
			if err != nil {
				log.Fatal(err)
			}

			gameSave, err := parser.ParseSaveGame(sg)
			if err != nil {
				log.Fatal(err)
			}
			view.WriteImage(farmMap, gameSave, f)
			sg.Close()
			f.Close()
			fmt.Printf("Done rewriting %v from %v\n", screenFile, gfile)
		}
	}

}
