package main

import (
	"fmt"
	"io"
	"io/ioutil"
	_ "log"
	"strconv"
	"sync"
	"time"

	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"
)

// Keeps a cache of videos, indexed by the farm's last save. If a new save is sent by the user, the cache is obsoleted.
// TODO: more granular locking.

func init() {
	// TODO: manage the cache space somehow.
	// os.RemoveAll(filepath.Join("/var/cache", "stardew"))
	historyCache = filepath.Join("/var/cache", "stardew", strconv.Itoa(int(time.Now().Unix())))
}

var historyCache string

var cacheMu sync.RWMutex

func ServeAnimation(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.URL.Path, "/history") {
		http.Error(w, "Not found"+r.URL.Path, http.StatusNotFound)
		return
	}
	s := strings.Split(r.URL.Path, "/")
	if len(s) != 3 {
		http.Error(w, fmt.Sprintf("...%v - %d", s, len(s)), http.StatusNotFound)
		return
	}
	if filepath.Ext(s[2]) != ".webm" {
		http.Error(w, "what!", http.StatusNotFound)
		return
	}

	farm, err := stardb.FindFarm(strings.Replace(s[2], ".webm", "", 1))
	if err != nil {
		log.Warningf("findfarm error: %v", err)
		http.Error(w, "no.. Not found", http.StatusNotFound)
		return
	}

	fmt.Println("processing", farm.Farmer)
	tmp, err := ioutil.TempDir("", farm.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer os.RemoveAll(tmp)

	saves := farm.SaveTimes()
	lastSave := saves[len(saves)-1]

	dest := filepath.Join(historyCache, fmt.Sprintf("%v-%v.webm", farm.ID, lastSave))
	if _, err := os.Stat(dest); err == nil {
		cacheMu.RLock()
		http.ServeFile(w, r, dest)
		cacheMu.RUnlock()
		return
	}
	fmt.Println("found existing file", dest)

	tmpScreenshotPaths := make([]string, 0, len(saves))

	dirCreated := false

	cols, closer := stardb.Collections()
	defer closer()

	// ffmpeg for windows does not support glob patterns, so we use a simple sequence for the file names.
	// http://stackoverflow.com/questions/31201164/ffmpeg-error-pattern-type-glob-was-selected-but-globbing-is-not-support-ed-by
	i := 0
	for _, savetime := range saves {
		ss := farm.ScreenshotPathByTime(savetime)
		p := filepath.Join(tmp, fmt.Sprintf("%04d.png", i))
		i++
		if !dirCreated {
			if err := os.MkdirAll(filepath.Dir(p), 1750); err != nil {
				log.Error("mkdir error:", err)
				continue
			}
			dirCreated = true
			log.Error("created dir", filepath.Dir(p))
		}
		sg, err := cols.GFS.Open(ss)
		if err != nil {
			log.Error("screen open warning:", err)
			continue
		}
		f, err := os.Create(p)
		if err != nil {
			log.Error("create tmp screenshot error:", err)
			continue
		}
		log.Infof("writing file")
		if _, err := io.Copy(f, sg); err != nil {
			log.Error("temp file write error:", err)
			f.Close()
			continue
		}
		log.Info("done")
		f.Close()
		tmpScreenshotPaths = append(tmpScreenshotPaths, f.Name())

	}
	fmt.Println("screenshots for ", farm.ID)
	for _, s := range tmpScreenshotPaths {
		fmt.Println(s)
	}
	os.MkdirAll(filepath.Dir(dest), 1750)
	cacheMu.Lock()
	defer cacheMu.Unlock()
	cmd := exec.Command(
		"avconv",
		"-nostats", // "-hide_banner",
		"-pix_fmt", "yuv420p", "-r", "1",
		"-i", filepath.Join(tmp, "%04d.png"), "-c:v", "libvpx", "-b:v", "2M", "-crf", "4",
		"-an",
		// draw a text + box:
		/*
			                "-vf", "format=yuv444p,"+
							"drawbox=y=900:color=black@0.4:width=iw:height=48:t=max,"+
							"drawtext=fontfile=/Windows/Fonts/arial.ttf:text='Title of this Video':fontcolor=white:fontsize=24:x=(w-tw)/2:y=910,"+
							"format=yuv420p",
		*/
		dest)
	// fmt.Printf("%q\n", cmd.Args)
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Errorf("command failed: %v %v", err, string(out))
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	log.Infof("wrote file to %v", dest)
	http.ServeFile(w, r, dest)
}
