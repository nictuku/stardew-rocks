// This program looks at all save games stored in the database and generates
// new screenshots with the latest renderer.
package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"

	"github.com/nictuku/stardew-rocks/stardb"
)

var animatedDir = os.TempDir()

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farmerRE := os.Args[1]
	log.Printf("Processing farms with farmer name matching `%v`", farmerRE)

	c := stardb.AllFarms(farmerRE)
	for farm := range c {
		fmt.Println("processing", farm.Farmer)
		tmp, err := ioutil.TempDir("", farm.ID)
		if err != nil {
			log.Println("temp file error:", err)
			continue
		}
		//defer os.RemoveAll(tmp)
		defer fmt.Println("would remove but skipped:", tmp)

		saves := farm.SaveTimes()
		tmpScreenshotPaths := make([]string, 0, len(saves))

		dirCreated := false

		for _, savetime := range saves {
			ss := farm.ScreenshotPathByTime(savetime)
			p := filepath.Join(tmp, ss)
			if !dirCreated {
				if err := os.MkdirAll(filepath.Dir(p), 0600); err != nil {
					log.Println("mkdir error:", err)
					continue
				}
				dirCreated = true
				log.Println("created dir", filepath.Dir(p))
			}
			sg, err := stardb.GFS.Open(ss)
			if err != nil {
				log.Println("screen open warning:", err)
				continue
			}
			f, err := os.Create(p)
			if err != nil {
				log.Println("create tmp screenshot error:", err)
				continue
			}
			log.Println("writing file")
			if _, err := io.Copy(f, sg); err != nil {
				log.Println("temp file write error:", err)
				f.Close()
				continue
			}
			log.Println("done")
			f.Close()
			tmpScreenshotPaths = append(tmpScreenshotPaths, f.Name())

		}
		fmt.Println("screenshots for ", farm.ID)
		for _, s := range tmpScreenshotPaths {
			fmt.Println(s)
		}
	}

}
