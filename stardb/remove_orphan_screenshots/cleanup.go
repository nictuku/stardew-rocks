// This program looks at all screenshots games stored in the database and removes those that don't have a corresponding save game.
// This allows us to reclaim disk space that is wasted by the dupe-saves. Typically this is run after remove_dupe_saves.
package main

import (
	"fmt"
	"path/filepath"
	"strconv"
	"strings"

	"gopkg.in/mgo.v2/bson"

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

func saveGameToSaveTime(s string) (int, error) {
	// input: /saveGames/56f34dd6f48e3e520cea687b/1458795576.xml
	// output: 1458795576
	base := filepath.Base(s)
	noExt := strings.TrimSuffix(base, filepath.Ext(base))
	return strconv.Atoi(noExt)
}

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)

	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		saveTimes := make(map[int]bool)
		for _, savetime := range farm.SaveTimes() {
			saveTimes[savetime] = true
		}

		var filenames []struct {
			FileName string `bson:"filename"`
		}

		prefix := fmt.Sprintf("^/screenshot/%v", farm.InternalID.Hex())
		if err := stardb.DB.C("sdr.files").Find(bson.M{
			"filename": bson.M{"$regex": prefix}}).Sort("filename").Select(bson.M{"filename": 1}).All(&filenames); err != nil {
			log.Printf("SaveTimes error: %v", err)
			return
		}

		for _, k := range filenames {
			tt, err := saveGameToSaveTime(k.FileName)
			if err != nil {
				log.Printf("convering savegame to time format %v", err)
				return
			}
			if !saveTimes[tt] {
				log.Printf("not found parent %v for %v. Deleting", k.FileName, farm.InternalID.Hex())
				err := stardb.GFS.Remove(k.FileName)
				if err != nil {
					log.Fatal(err)
				}
			} else {
				//				log.Printf("YES found %v in %v", tt, k.FileName)
			}
		}
	}
}
