// stardew.rocks web server
//
// It contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.
package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"

	hs "github.com/gorilla/handlers"
	"gopkg.in/natefinch/lumberjack.v2"
)

func wwwDir() string {
	home := os.Getenv("HOME")
	if home == "" {
		home = string(filepath.Separator)
	}
	return filepath.Clean(filepath.Join(home, "www"))
}

func Index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join(wwwDir(), "index.html"))
}

func GetFarms(w http.ResponseWriter, r *http.Request) {
	b, err := stardb.FarmsJSON()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = w.Write(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	return
}

func GetFarm(w http.ResponseWriter, r *http.Request) {
	farmid := strings.TrimPrefix(r.URL.Path, "/api/farm/")

	b, err := stardb.FarmJSON(farmid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = w.Write(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	return
}

func RunHTTPServer() {
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Println("Error starting www server:", err)
		// os.IsPermission doesn't match.
		if strings.Contains(err.Error(), "permission denied") {
			// Only for linux and port 80. Keeping here for future convenience.
			log.Println("Try: sudo setcap 'cap_net_bind_service=+ep' www")
		}
	}
}

func main() {

	log.SetOutput(&lumberjack.Logger{
		Filename:   "/var/log/stardew/server.log",
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28, //days
	})

	combinedLog := &lumberjack.Logger{
		Filename:   "/var/log/stardew/access.log",
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28, //days
	}

	dir := wwwDir()
	log.Printf("Serving files from %v", dir)
	http.Handle("/api/farms", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(GetFarms)))
	http.Handle("/api/farm/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(GetFarm)))

	http.Handle("/screenshot/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeScreenshot)))
	//http.Handle("/saveGames/", logHandler(http.HandlerFunc(ServeGFSFile)))

	// This is served by the web app.
	http.Handle("/farm/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(Index)))

	// This is served from the filesystem, but / goes to index.html which has our web app.
	http.Handle("/", hs.CombinedLoggingHandler(combinedLog, http.FileServer(http.Dir(dir))))
	RunHTTPServer()
}
