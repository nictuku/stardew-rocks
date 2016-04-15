// This program looks at the most save game for each farm in the database. It reparses the farm
// data and updates the farm history on the database. This is used when new data is added for the farms.

package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/stardb"
)

var lastOnly = flag.Bool("lastonly", true, "Only parse the last save for the farm")

func main() {
	flag.Parse()
	if len(flag.Args()) != 1 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := flag.Args()[0]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)
	totalFarms := 0
	totalSaves := 0
	for farm := range c {
		totalFarms++
		fmt.Println("processing", farm.Farmer)

		savetimes := []int{}
		if *lastOnly {
			savetimes = []int{int(farm.LastUpdate.Unix())}
		} else {
			savetimes = farm.SaveTimes()
		}
		for _, st := range savetimes {
			gfile := stardb.SaveGamePathInt(farm.InternalID.Hex(), st)
			log.Println(gfile)

			sg, err := stardb.GFS.Open(gfile)
			if err != nil {
				log.Fatal(err)
			}
			gameSave, err := parser.ParseSaveGame(sg)
			if err != nil {
				log.Fatal(err)
			}
			fi, err := stardb.FarmHistoryFromSaveGame(farm.InternalID, gameSave, st)
			if err != nil {
				log.Fatal(err)
			}
			if err := stardb.InsertFarmHistory(farm.InternalID, fi); err != nil {
				log.Fatal(err)
			}
			totalSaves++
		}
		log.Printf("Done reparsing %v with %v items\n", farm.Farmer, len(savetimes))
	}
	log.Printf("Updated %d farms and %d save games", totalFarms, totalSaves)
}
