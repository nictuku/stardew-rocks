// This program looks at all save games stored in the database and generates
// new screenshots with the latest renderer.
package main

import (
	"fmt"
	"github.com/nictuku/stardew-rocks/stardb"
	//	"gopkg.in/mgo.v2"
	"log"
	"os"
)

type farmSave struct {
	SaveTime int
	FilePath string
	Size     int64
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)

	totalDelete := int64(0)

	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		uniqueSaves := make(map[string][]*farmSave)
		for _, savetime := range farm.SaveTimes() {
			gfile := stardb.SaveGamePathInt(farm.InternalID.Hex(), savetime)
			sg, err := stardb.GFS.Open(gfile)
			if err != nil {
				log.Fatal(err)
			}
			uniqueSaves[sg.MD5()] = append(uniqueSaves[sg.MD5()], &farmSave{
				SaveTime: savetime,
				FilePath: gfile,
				Size:     sg.Size(),
			})
		}
		for md5, files := range uniqueSaves {
			if len(files) > 1 {
				fmt.Printf("md5 %v %d\n", md5, len(files))
				older := 1<<63 - 1 // maxint
				for _, f := range files {
					if f.SaveTime < older {
						older = f.SaveTime
					}
				}
				for _, f := range files {
					if f.SaveTime > older {
						if (f.SaveTime - older) > 60 {
							log.Fatalf("unexpected delta between save times for %v: %d - %d = %d", f.FilePath, f.SaveTime, older, f.SaveTime - older)
						}
						fmt.Println("would delete", f.FilePath)
						totalDelete += f.Size
					}
				}
			}
		}
	}
	fmt.Println("total bytes", totalDelete)

}
