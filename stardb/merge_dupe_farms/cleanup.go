// This program looks at all farms in the database and finds duplicate ones,
// with the same metadata but different database ids.
//
// It merges those entries into the one with more save games recorded in them.
//
// This is useful during database migrations. For example, when moving to hetz,
// I started the susbscriber first in the new database (to ensure no new saves
// are lost), then started a mongodump and a data transfer. The farms created before
// the mongorestore ran ended up with two distinct mongo IDs - which translates
// to two different URLs.
//
// This tool let me treat the "old" database as authoritative, but preserving new
// data created in the new one after the db dump was taken.
//
// Remember to run the remove dupe saves tool and to generate screenshots after this.
package main

import (
	"fmt"

	"io"
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/stardb"
)

type farmSave struct {
	SaveTime int
	FilePath string
	Size     int64
}

type UniqueFarm struct {
	UniqueID int
	Name     string
	Farmer   string
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)

	uniqueFarms := map[UniqueFarm][]*stardb.Farm{}

	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		uniq := UniqueFarm{
			farm.UniqueID,
			farm.Name,
			farm.Farmer,
		}
		uniqueFarms[uniq] = append(uniqueFarms[uniq], farm)
	}
	for f, u := range uniqueFarms {
		var chosen *stardb.Farm
		if len(u) > 1 {
			fmt.Println("====")
			fmt.Println(f, len(u))
			for _, ff := range u {
				fmt.Println("saves", len(ff.SaveTimes()))
				if chosen == nil || len(chosen.SaveTimes()) < len(ff.SaveTimes()) {
					chosen = ff
				}
			}
			fmt.Println("chosen the one with", len(chosen.SaveTimes()))
			for _, ff := range u {
				if ff == chosen {
					continue
				}
				for _, savetime := range ff.SaveTimes() {
					src := stardb.SaveGamePathInt(ff.InternalID.Hex(), savetime)
					// newPath
					dst := stardb.SaveGamePathInt(chosen.InternalID.Hex(), savetime)
					srcfile, err := stardb.GFS.Open(src)
					if err != nil {
						log.Fatal(err)
					}
					dstfile, err := stardb.GFS.Create(dst)
					if err != nil {
						log.Fatal(err)
					}
					_, err = io.Copy(dstfile, srcfile)
					if err != nil {
						log.Fatal(err)
					}
					log.Println("copied", src, "to", dst)
					srcfile.Close()
					dstfile.Close()
					if err := stardb.GFS.Remove(src); err != nil {
						log.Fatal(err)
					}
					log.Println("removed", src)
				}
				if err := stardb.FarmCollection.RemoveId(ff.InternalID); err != nil {
					log.Fatal(err)
				}
				log.Printf("Removed %v", ff.InternalID.Hex())
			}
		}
	}
}
