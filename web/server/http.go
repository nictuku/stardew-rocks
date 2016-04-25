// stardew.rocks web server
//
// It contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.
package main

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/NYTimes/gziphandler"
	hs "github.com/gorilla/handlers"
	zglob "github.com/mattn/go-zglob"
	logging "github.com/op/go-logging"
	"golang.org/x/text/language"
	"gopkg.in/natefinch/lumberjack.v2"
	"github.com/bmizerany/pat"

	"github.com/nictuku/stardew-rocks/stardb"
)

var log = logging.MustGetLogger("stardew.rocks")

type Message struct {
	ID             string `json:"id"`
	Description    string `json:"description"`
	DefaultMessage string `json:"defaultMessage"`
}

type Messages []Message

func wwwDir() string {
	home := os.Getenv("HOME")
	if home == "" {
		home = string(filepath.Separator)
	}
	base := "www"
	if os.Getenv("STAGE") != "" {
		base = "www-" + os.Getenv("STAGE")
	}
	return filepath.Clean(filepath.Join(home, base))
}

var localesMatcher language.Matcher

func GetLocaleInfo(r *http.Request) ([]byte, string, error) {
	// get best locale for client
	localeTags, _, _ := language.ParseAcceptLanguage(r.Header.Get("Accept-Language"))
	localeTag, _, _ := localesMatcher.Match(localeTags...)
	locale := localeTag.String()

	// get messages for locale
	messages, err := zglob.Glob(filepath.Join(wwwDir(), "i18n", locale, "**", "*.json"))
	if err != nil {
		return nil, "", err
	}
	var messagesMap []Message
	for _, message := range messages {
		file, _ := ioutil.ReadFile(message)
		var messageJson Messages
		_ = json.Unmarshal(file, &messageJson)
		messagesMap = append(messagesMap, messageJson...)
	}
	messagesJson, err := json.Marshal(messagesMap)
	return messagesJson, locale, err
}

var tmpl *template.Template

func init() {
	fp := filepath.Join(wwwDir(), "index.html")
	var err error
	tmpl, err = template.ParseFiles(fp)
	if err != nil {
		panic(err)
	}
	// get supported locales
	localePaths, err := filepath.Glob(filepath.Join(wwwDir(), "i18n", "*"))
	if err != nil {
		panic(err)
	}
	var locales []language.Tag
	for _, locale := range localePaths {
		locales = append(locales, language.Make(filepath.Base(locale)))
	}
	localesMatcher = language.NewMatcher(locales)

}

func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	messagesJson, locale, err := GetLocaleInfo(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.ExecuteTemplate(w, "index", struct {
		Messages template.JS
		Locale   string
	}{
		template.JS(messagesJson),
		locale,
	})
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
	log.Infof("url: %v, query: %v", r.URL, r.URL.Query().Get(":id"))

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
 	r := pat.New()

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

	// Api
	r.Get("/api/farms", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(GetFarms)))
	r.Get("/api/farm/", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(GetFarm))))
	r.Get("/api/search/farm", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(SearchFarms)))

	// Media
	r.Get("/screenshot/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeScreenshot)))
	r.Get("/history/", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(ServeAnimation)))

	//r.Get("/saveGames/", logHandler(http.HandlerFunc(ServeGFSFile)))

	// Webapp
	r.Get("/content/", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(StaticFiles))))
	r.Get("/about", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(Index)))
	r.Get("/:id/stats", hs.CombinedLoggingHandler(combinedLog, http.HandlerFunc(Index)))
	r.Get("/:id", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(Root))))
	r.Get("/", hs.CombinedLoggingHandler(combinedLog, gziphandler.GzipHandler(http.HandlerFunc(Index))))

	http.Handle("/", r)
	RunHTTPServer()
}
