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

func WriteImage(pm *parser.Map, w io.Writer) {
	m := pm.TMX

	dirt := &image.Uniform{color.RGBA{0xEE, 0xAC, 0x24, 0xFF}}
	img := image.NewRGBA(image.Rect(0, 0, m.Width*m.TileWidth, m.Height*m.TileHeight))

	draw.Draw(img, img.Bounds(), dirt, image.ZP, draw.Src)

	for y := 0; y < m.Height; y++ {
		for x := 0; x < m.Width; x++ {
			for _, layer := range m.Layers { // XXX ensure this is following the right order
				if layer.Name != "AlwaysFront" {
					continue
				}
				if tile := layer.DecodedTiles[y*m.Width+x]; !tile.IsNil() {
					// Fetch tile from tileset. XXX move to a func
					src, err := pm.FetchSource(tile.Tileset.Image.Source)
					if err != nil {
						log.Printf("error fetchin %v: %v", tile.Tileset.Image.Source, err)
						continue
					}
					srcBounds := src.Bounds()
					//log.Printf("woot, found (tile.Tileset.Image.Source")
					x0, y0 := tileCoordinates(int(tile.ID), m.TileWidth, m.TileHeight, srcBounds.Dx())

					//y0 = int(tile.ID) / srcBounds.Dx()
					//x0 = int(tile.ID) * m.TileHeight % (srcBounds.Dx() / m.TileWidth)
					sr := image.Rect(x0, y0, x0+m.TileHeight, y0+m.TileWidth)
					r := sr.Sub(sr.Min).Add(image.Point{x * m.TileWidth, y * m.TileHeight})
					draw.Draw(img, r, src, sr.Min, draw.Src)
					if x == 67 && y == 62 {

						log.Printf("67,62: x0, y0 %v %v", x0, y0)
						log.Printf(" %v id", tile.ID)

						// Expects a chalice from 117 (aprox 270,78)
						// 5th row from the bottom [0-15,16-31,32-47,48-]
						log.Printf("67,62: %+v", layer.DecodedTiles[y*m.Width+x])
						log.Printf(" Layer: %v, opacity %v", layer.Name, layer.Opacity)
					}
				}
			}
			/*if strings.HasPrefix(farmMap.Loc[y][x], "tree") {
				v = &image.Uniform{plant}
			} else if farmMap.Loc[y][x] != "" {
				v = &image.Uniform{weed}
			} else {
				v = dirt
			}
			*/

			// draw.Draw(img, image.Rect(x*10, y*10, x*10+10, y*10+10), v, image.ZP, draw.Src)
		}
	}

	if err := png.Encode(w, img); err != nil {
		panic(err)
	}

	//buf.WriteTo(f)
	//enc := base64.StdEncoding.EncodeToString(buf.Bytes())
	//fmt.Println("IMAGE:" + enc)

}

/*

	f, err := os.OpenFile("file.png", os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		panic(err)
	}
*/
