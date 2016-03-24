package main

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"
)

func ServeScreenshot(w http.ResponseWriter, r *http.Request) {
	if !strings.HasPrefix(r.URL.Path, "/screenshot") {
		http.Error(w, "Not found"+r.URL.Path, http.StatusNotFound)
		return
	}
	s := strings.Split(r.URL.Path, "/")
	if len(s) != 4 {
		http.Error(w, fmt.Sprintf("...%v - %d", s, len(s)), http.StatusNotFound)
		return
	}
	if s[1] != "screenshot" {
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
