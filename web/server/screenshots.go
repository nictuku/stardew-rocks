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

func LegacyMap(w http.ResponseWriter, r *http.Request) {
	// map-Rey-1458536597.png
	m := strings.Split(r.URL.Path, "-")
	if len(m) != 3 {
		http.Error(w, fmt.Sprintf("unexpected length: %d", len(m)), http.StatusBadRequest)
		return
	}
	farmer := m[1]
	lastSave := strings.Split(m[2], ".")[0]
	farm, err := stardb.LegacyMap(farmer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if farm.ID == "" {
		http.Error(w, fmt.Sprintf("empty %d", len(farm.ID)), http.StatusBadRequest)
		return
	}
	http.Redirect(w, r, fmt.Sprintf("/screenshot/%v/%v.png", farm.ID, lastSave), http.StatusSeeOther)
	return
}

func widthPath(filepath string) (normalizedPath, width string, ok bool) {
	spl := strings.SplitN(filepath, ".", 2)

	if len(spl) != 2 {
		return filepath, "", false
	}
	suf := strings.SplitN(spl[0], "w", 2)
	if len(suf) != 2 {
		return filepath, "", false
	}
	return suf[0] + "." + spl[1], suf[1], true

}

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

	path := r.URL.Path

	// The target width can be specified by a ?w=<value> parameter, or by
	// a w<number>.png suffix in the file basename.

	width := r.URL.Query().Get("w")
	if p, wp, ok := widthPath(s[3]); ok {
		width = wp
		path = strings.Join(append(s[0:3], p), "/")
	}

	if f, err = stardb.GFS.Open(path); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if width != "" {
		wid, err := strconv.Atoi(width)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		if wid < 100 || wid > 500 {
			http.Error(w, "Invalid range", http.StatusBadRequest)
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
