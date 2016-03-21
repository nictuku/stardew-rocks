package view

import (
	"image"
	"image/draw"
	"log"
	"math/rand"

	"github.com/nictuku/stardew-rocks/parser"
)

func drawGrass(pm *parser.Map, item *parser.TerrainItem, img draw.Image) {
	if item.Value.TerrainFeature.Type != "Grass" {
		return
	}
	whichWeed := rand.Perm(5)
	if item.Value.TerrainFeature.NumberOfWeeds >= len(whichWeed) {
		return
	}
	offsetWeeds := [4][]int{
		rand.Perm(5),
		rand.Perm(5),
		rand.Perm(5),
		rand.Perm(5),
	}
	flipWeed := [4]bool{
		rand.Float32() < 0.5,
		rand.Float32() < 0.5,
		rand.Float32() < 0.5,
		rand.Float32() < 0.5,
	}
	m := pm.TMX
	src, err := pm.FetchSource("../TerrainFeatures/grass.png")
	if err != nil {
		log.Fatalf("Error fetching image asset %v", err)
	}
	for i, weed := range whichWeed[0:item.Value.TerrainFeature.NumberOfWeeds] {
		if i >= len(flipWeed) {
			continue
		}
		idx := 0
		if weed < len(whichWeed) {
			idx = whichWeed[weed] * 15
		}
		sr := grassRect(idx, item.Value.TerrainFeature.GrassType)
		r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X*m.TileWidth + (offsetWeeds[2][i]),
			item.Key.Vector2.Y*m.TileHeight - i%2*m.TileHeight/2 + offsetWeeds[3][i],
		})
		if flipWeed[i] {
			sr = xnaRect(0, 0, m.TileWidth, m.TileHeight)
		}
		sb.DrawMask(img, r, maybeFlip(flipWeed[i], src, sr), sr.Min, mask, sr.Min, draw.Over, grassLayer)
	}
}
