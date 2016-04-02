// This program looks at the most save game for each farm in the database. It reparses the farm
// data and updates the metadata on the database. This is used when new data is added for the farms.

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/stardb"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)
	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		gfile := stardb.SaveGamePathInt(farm.InternalID.Hex(), int(farm.LastUpdate.Unix()))
		sg, err := stardb.GFS.Open(gfile)
		if err != nil {
			log.Fatal(err)
		}
		gameSave, err := parser.ParseSaveGame(sg)
		if err != nil {
			log.Fatal(err)
		}
		fi, err := stardb.FarmInfoFromSaveGame(gameSave)
		if err != nil {
			log.Fatal(err)
		}
		if err := stardb.UpdateFarmInfo(farm.InternalID, fi); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Done reparsing %v at %v\n", fi.Player.FarmName, fi.Player.DateStringForSaveGame)

	}

}
