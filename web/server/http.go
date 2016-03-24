// stardew.rocks web server
//
// It contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"
	"github.com/nytimes/gziphandler"
)

func logzip(handler http.Handler) http.Handler {
	return gziphandler.GzipHandler(logHandler(handler))
}

func logHandler(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)
		handler.ServeHTTP(w, r)
	})
}

func wwwDir() string {
	home := os.Getenv("HOME")
	if home == "" {
		home = string(filepath.Separator)
	}
	return filepath.Clean(filepath.Join(home, "www"))
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

func ServeGFSFile(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.URL.Path, "/screenshot") {
		http.Error(w, "Not found"+r.URL.Path, http.StatusNotFound)
		return
	}
	s := strings.Split(r.URL.Path, "/")
	if len(s) != 4 {
		http.Error(w, fmt.Sprintf("...%v - %d", s, len(s)), http.StatusNotFound)
		return
	}
	if s[1] != "screenshot" && s[1] != "saveGames" {
		http.Error(w, "no.. Not found", http.StatusNotFound)
		return
	}

	f, err := stardb.GFS.Open(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = io.Copy(w, f)
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
	dir := wwwDir()
	log.Printf("Serving files from %v", dir)
	http.Handle("/", logzip(http.FileServer(http.Dir(dir))))
	http.Handle("/farms", logHandler(http.HandlerFunc(GetFarms)))
	http.Handle("/screenshot/", logHandler(http.HandlerFunc(ServeGFSFile)))
	http.Handle("/saveGames/", logHandler(http.HandlerFunc(ServeGFSFile)))
	RunHTTPServer()
}
