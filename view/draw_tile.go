package view

import (
	"image"
	"image/draw"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/salviati/go-tmx/tmx"
)

func drawTile(pm *parser.Map, season string, tile *tmx.DecodedTile, img draw.Image, x, y int, layer float32) {
	if tile.IsNil() {
		return
	}
	m := pm.TMX

	// Fetch tile from tileset.
	src, err := pm.FetchSeasonSource(tile.Tileset.Image.Source, season)
	if err != nil {
		log.Printf("Error fetching image asset %v: %v", tile.Tileset.Image.Source, err)
		return
	}
	srcBounds := src.Bounds()
	x0, y0 := tileCoordinates(int(tile.ID), m.TileWidth, m.TileHeight, srcBounds.Dx())
	sr := image.Rect(x0, y0, x0+m.TileHeight, y0+m.TileWidth)
	r := sr.Sub(sr.Min).Add(image.Point{x * m.TileWidth, y * m.TileHeight})
	// DrawMask with draw.Over and an alpha channel ensure the background is transparent.
	// Anyway, it works.
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, layer)
}
