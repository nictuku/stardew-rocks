package main

import (
	"fmt"
	"image"
	"image/png"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/nictuku/stardew-rocks/stardb"

	"github.com/disintegration/imaging"
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
	var (
		f   io.Reader
		err error
	)
	if f, err = stardb.GFS.Open(r.URL.Path); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	width := r.URL.Query().Get("w")
	if width != "" {
		wid, err := strconv.Atoi(width)
		if err != nil || wid < 100 || wid > 500 {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Convert to a thumbnail.
		m, _, err := image.Decode(f)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// I tried various resampling filters. Box and CatmullRom seemed to be the best
		// for displaying farm thumbnails at 300px. Since the documentation claims that
		// Box is fast, I picked that.
		m = imaging.Resize(m, wid, 0, imaging.Box)
		// Higher contrast, give the thumbnails a "kick".
		m = imaging.AdjustContrast(m, 20)

		if err = png.Encode(w, m); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		return
	}

	_, err = io.Copy(w, f)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	return
}
