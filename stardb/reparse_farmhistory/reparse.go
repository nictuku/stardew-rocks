// This program looks at the most save game for each farm in the database. It reparses the farm
// data and updates the farm history on the database. This is used when new data is added for the farms.

package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"sync"

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
	mu := new(sync.Mutex)
	wg := new(sync.WaitGroup)
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			for farm := range c {
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
						log.Println(err)
						continue
					}
					gameSave, err := parser.ParseSaveGame(sg)
					if err != nil {
						log.Println(err)
						continue
					}
					fi, err := stardb.FarmHistoryFromSaveGame(farm.InternalID, gameSave, st)
					if err != nil {
						log.Println(err)
						continue
					}
					if err := stardb.InsertFarmHistory(farm.InternalID, fi); err != nil {
						log.Println(err)
						continue
					}
					mu.Lock()
					totalSaves++
					mu.Unlock()
				}
				mu.Lock()
				totalFarms++
				mu.Unlock()
				log.Printf("Done reparsing %v with %v items\n", farm.Farmer, len(savetimes))
			}
			wg.Done()
		}()
	}
	wg.Wait()
	log.Printf("Updated %d farms and %d save games", totalFarms, totalSaves)
}
