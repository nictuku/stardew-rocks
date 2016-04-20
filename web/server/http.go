// stardew.rocks web server
//
// It contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.
package main

import (
	"html/template"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"encoding/json"
  "io/ioutil"

	"github.com/nictuku/stardew-rocks/stardb"

	logging "github.com/op/go-logging"

	"github.com/NYTimes/gziphandler"
	hs "github.com/gorilla/handlers"
	"gopkg.in/natefinch/lumberjack.v2"
	"github.com/bmatcuk/doublestar"
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
	w.Header().Set("Content-Type", "text/html")
	locale := strings.Split(r.Header["Accept-Language"][0], ",")[0]
	messagesPath := filepath.Join(wwwDir(), "i18n", locale)
	var	messages []string
	messages, globErr := doublestar.Glob(filepath.Join(messagesPath, "**", "*.json"))
	if messages == nil {
		// porque glob-chan
		components := []string{
			"Drawer.json",
			"FarmCard.json",
			"FarmMeta.json",
			"FarmSlider.json",
			"Home.json",
			"Navbar.json",
			"SearchBar.json",
		}
		for _, component := range components {
			messages = append(messages, filepath.Join(messagesPath, "src", "components", component))
		}
	}
	log.Infof("path: %v, glob:%v, err:%v", messagesPath, len(messages), globErr)

	messagesMap := make(map[string]map[string]string)
	for _, message := range messages {
		file, _ := ioutil.ReadFile(message)
		messageJson :=  make(map[string]string)
		json.Unmarshal([]byte(file), &messageJson)
		messagesMap[filepath.Base(message)] = messageJson
	}
	log.Infof("hmmm:%v", messagesMap)

	fp := filepath.Join(wwwDir(), "index.html")

	tmpl, _ := template.ParseFiles(fp)

	tmpl.ExecuteTemplate(w, "index", nil)
}

func GetFarms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
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

	w.Header().Set("Content-Type", "application/json")
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

func StaticFiles(w http.ResponseWriter, r *http.Request) {
	dir := wwwDir()
	http.FileServer(http.Dir(dir)).ServeHTTP(w, r)
}

func Root(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/map") {
		LegacyMap(w, r)
		return
	}
	// Allow URLs such as http://stardew.farm/56f360131700d41646571433
	if len(r.URL.Path) == 25 || len(r.URL.Path) == 1 { // len("/56f360131700d41646571433")
		Index(w, r)
		return
	}

	StaticFiles(w, r)
}

// SearchFarms searches for farms or farmers. It looks for a query paramater "q".
func SearchFarms(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	w.Header().Set("Content-Type", "application/json")
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
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	err := http.ListenAndServe(":"+port, nil)
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
	http.Handle("/api/farm/", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(GetFarm))))
	http.Handle("/api/search/farm", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(SearchFarms)))

	http.Handle("/screenshot/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeScreenshot)))
	http.Handle("/history/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeAnimation)))

	//http.Handle("/saveGames/", logHandler(http.HandlerFunc(ServeGFSFile)))

	// This is served by the web app.
	http.Handle("/about/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(Index)))

	// This is served from the filesystem, but / goes to index.html which has our web app.
	http.Handle("/", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(Root))))

	RunHTTPServer()
}
