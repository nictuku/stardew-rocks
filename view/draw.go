package view

import (
	"image"
	"image/color"
	"image/draw"
	_ "image/jpeg"
	"image/png"
	"io"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

const (
	dx, dy = 100, 100
)

var (
	plant = color.RGBA{0x3B, 0x92, 0x10, 255} // 3B9210
	weed  = color.RGBA{0x0F, 0x4D, 0x04, 255}
)

func tileCoordinates(id int, tileWidth, tileHeight, tilemapWidth int) (x0, y0 int) {
	numColumns := tilemapWidth / tileWidth
	y0 = id / numColumns * tileHeight
	x0 = id % numColumns * tileWidth
	return x0, y0
}

var mask = image.NewUniform(color.Alpha{255})

func WriteImage(pm *parser.Map, sg *parser.GameLocation, w io.Writer) {
	m := pm.TMX

	dirt := &image.Uniform{color.RGBA{0xEE, 0xAC, 0x24, 0xFF}}
	img := image.NewRGBA(image.Rect(0, 0, m.Width*m.TileWidth, m.Height*m.TileHeight))

	draw.Draw(img, img.Bounds(), dirt, image.ZP, draw.Src)

	for y := 0; y < m.Height; y++ {
		for x := 0; x < m.Width; x++ {
			for _, layer := range m.Layers { // Layers are apparently ordered correctly.
				if tile := layer.DecodedTiles[y*m.Width+x]; !tile.IsNil() {
					// Fetch tile from tileset. XXX move to a func
					src, err := pm.FetchSource(tile.Tileset.Image.Source)
					if err != nil {
						log.Printf("error fetchin %v: %v", tile.Tileset.Image.Source, err)
						continue
					}
					srcBounds := src.Bounds()
					x0, y0 := tileCoordinates(int(tile.ID), m.TileWidth, m.TileHeight, srcBounds.Dx())
					sr := image.Rect(x0, y0, x0+m.TileHeight, y0+m.TileWidth)
					r := sr.Sub(sr.Min).Add(image.Point{x * m.TileWidth, y * m.TileHeight})
					// DrawMask with draw.Over and an alpha channel ensure the background is transparent.
					// Anyway, it works.
					draw.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over)
				}
			}
		}
	}
	if err := png.Encode(w, img); err != nil {
		panic(err)
	}
}
