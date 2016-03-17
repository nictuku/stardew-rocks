package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"github.com/nytimes/gziphandler"
)

// This file contains a few HTTP handlers:
// - a static handler that serves files from /home/stardew/www.
// - a handler that serves the latest complete file save in XML format.

func Log(handler http.Handler) http.Handler {
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

var (
	lastSave   []byte
	lastSaveMu sync.RWMutex
)

func LastSave(w http.ResponseWriter, r *http.Request) {
	lastSaveMu.Lock()
	defer lastSaveMu.Unlock()
	if len(lastSave) == 0 {
		w.Write([]byte("Empty :-("))
	} else {
		w.Write(lastSave)
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

func init() {
	dir := wwwDir()
	log.Printf("Serving files from %v", dir)
	http.Handle("/", Log(gziphandler.GzipHandler(http.FileServer(http.Dir(dir)))))
	http.Handle("/lastsave", Log(gziphandler.GzipHandler(http.HandlerFunc(LastSave))))

}
