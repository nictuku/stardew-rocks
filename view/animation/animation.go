// This program looks at all save games stored in the database and generates
// new screenshots with the latest renderer.
package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
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

		// ffmpeg for windows does not support glob patterns, so we use a simple sequence for the file names.
		// http://stackoverflow.com/questions/31201164/ffmpeg-error-pattern-type-glob-was-selected-but-globbing-is-not-support-ed-by
		i := 0
		for _, savetime := range saves {
			ss := farm.ScreenshotPathByTime(savetime)
			p := filepath.Join(tmp, fmt.Sprintf("%04d.png", i))
			i++
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
		dest := filepath.Join(tmp, "output.webm")
		cmd := exec.Command("ffmpeg",
			"-nostats", "-hide_banner",
			"-an", "-pix_fmt", "yuv420p", "-r", "1",
			"-i", filepath.Join(tmp, "%04d.png"), "-c:v", "libvpx", "-b:v", "2M", "-crf", "4",
			// draw a text + box:
			/*
				                "-vf", "format=yuv444p,"+
								"drawbox=y=900:color=black@0.4:width=iw:height=48:t=max,"+
								"drawtext=fontfile=/Windows/Fonts/arial.ttf:text='Title of this Video':fontcolor=white:fontsize=24:x=(w-tw)/2:y=910,"+
								"format=yuv420p",
			*/
			dest)
		fmt.Printf("%q\n", cmd.Args)
		out, err := cmd.CombinedOutput()
		if err != nil {
			log.Printf("command failed: %v %v", err, string(out))
		}
		log.Println("wrote file to", dest)

	}

}
