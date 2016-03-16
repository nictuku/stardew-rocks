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

	if true {
		for y := 0; y < m.Height; y++ {
			for x := 0; x < m.Width; x++ {
				for _, layer := range m.Layers { // Layers are apparently ordered correctly.
					if layer.Name == "Paths" {
						continue // Looks ugly. Need some work to look pretty.
					}
					if tile := layer.DecodedTiles[y*m.Width+x]; !tile.IsNil() {
						// Fetch tile from tileset.
						src, err := pm.FetchSource(tile.Tileset.Image.Source)
						if err != nil {
							log.Printf("Error fetching image asset %v: %v", tile.Tileset.Image.Source, err)
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
	}
	// path: ../TerrainFeatures/tree1_spring
	// sg.TerrainFeatures.Items[0].Value.TerrainFeature.TreeType

	{
		p := "../Buildings/houses.png"
		src, err := pm.FetchSource(p)
		if err != nil {
			log.Printf("Error fetching terrain asset %v: %v", p, err)
			panic(err)
		}
		{
			// house
			sr := image.Rect(0, 0, 160, 144)
			r := sr.Sub(sr.Min).Add(image.Point{930, 130})
			draw.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over)
		}
		{
			// greenHouse
			sr := image.Rect(160, 0, 272, 160)
			r := sr.Sub(sr.Min).Add(image.Point{400, 96})
			draw.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over)
		}
	}

	// objects are in Maps/springobjects.png
	{
		p := "../Maps/springobjects.png"
		src, err := pm.FetchSource(p)
		if err != nil {
			log.Printf("Error fetching terrain asset %v: %v", p, err)
			panic(err)
		}
		srcBounds := src.Bounds()

		for _, item := range sg.Objects.Items {
			x0, y0 := tileCoordinates(item.Value.Object.ParentSheetIndex, 16, 16, srcBounds.Dx())
			sr := image.Rect(x0, y0, x0+16, y0+16)
			r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * 16, item.Key.Vector2.Y * 16})
			draw.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over)
		}
	}

	if err := png.Encode(w, img); err != nil {
		panic(err)
	}
}
