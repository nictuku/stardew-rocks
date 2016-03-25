// stardew.rocks web server
//
// It contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.
package main

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"

	logging "github.com/op/go-logging"

	hs "github.com/gorilla/handlers"
	"gopkg.in/natefinch/lumberjack.v2"
)

var log = logging.MustGetLogger("stardew.rocks")

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

// SearchFarms searches for farms or farmers. It looks for a query paramater "q". 
func SearchFarms(w http.ResponseWriter, r *http.Request) {
    r.ParseForm()

    q := r.Form.Get("q")
    if len(q) == 0 {
        w.Write([]byte("{}"))
        return
    }
	b, err := stardb.SearchFarmsJSON(q)
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
		log.Error("Error starting www server:", err)
		// os.IsPermission doesn't match.
		if strings.Contains(err.Error(), "permission denied") {
			// Only for linux and port 80. Keeping here for future convenience.
			log.Error("Try: sudo setcap 'cap_net_bind_service=+ep' www")
		}
	}
}

func main() {

	serverlog := logging.NewBackendFormatter(logging.NewLogBackend(&lumberjack.Logger{
		Filename:   "/var/log/stardew/server.log",
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28, //days
	}, "", 0), logging.GlogFormatter)

	formatted := logging.AddModuleLevel(serverlog)
	formatted.SetLevel(logging.INFO, "")

	stderr := logging.NewBackendFormatter(logging.NewLogBackend(os.Stderr, "", 0), logging.GlogFormatter)

	// Set the backends to be used and the default level.
	logging.SetBackend(stderr, formatted)

	combinedLog := &lumberjack.Logger{
		Filename:   "/var/log/stardew/access.log",
		MaxSize:    500, // megabytes
		MaxBackups: 3,
		MaxAge:     28, //days
	}

	dir := wwwDir()
	log.Infof("Serving files from %v", dir)
	http.Handle("/api/farms", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(GetFarms)))
	http.Handle("/api/farm/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(GetFarm)))
	http.Handle("/api/search/farm", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(SearchFarms)))

	http.Handle("/screenshot/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeScreenshot)))
	//http.Handle("/saveGames/", logHandler(http.HandlerFunc(ServeGFSFile)))

	// This is served by the web app.
	http.Handle("/farm/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(Index)))

	// This is served from the filesystem, but / goes to index.html which has our web app.
	http.Handle("/", hs.CombinedLoggingHandler(combinedLog, http.FileServer(http.Dir(dir))))
	RunHTTPServer()
}
