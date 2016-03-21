package view

import (
	"fmt"
	"image"
	"image/draw"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

var treeRects = map[int]image.Rectangle{
	0: xnaRect(32, 128, 16, 16),
	1: xnaRect(0, 128, 16, 16),
	2: xnaRect(16, 128, 16, 16),
	3: xnaRect(0, 96, 16, 32),
	4: xnaRect(0, 96, 16, 32),
}

func treeAsset(treeType int, season string) string {
	if treeType == 3 && season == "summer" {
		season = "spring"
	}
	return fmt.Sprintf("../TerrainFeatures/tree%d_%v.png", treeType, season)
}

func drawTree(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image) {
	m := pm.TMX

	if item.Value.TerrainFeature.Type != "Tree" {
		return
	}
	p := treeAsset(item.Value.TerrainFeature.TreeType, season)
	src, err := pm.FetchSource(p)
	if err != nil {
		log.Printf("Error fetching terrain asset %v: %v", p, err)
		return
	}
	stage := item.Value.TerrainFeature.GrowthStage
	if stage < 5 {
		sr, ok := treeRects[stage]
		if !ok {
			log.Printf("Unknown tree rect for %v", item.Value.TerrainFeature.GrowthStage)
			return
		}
		r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * m.TileWidth, item.Key.Vector2.Y * m.TileHeight})
		sb.Draw(img, r, src, sr.Min, treeLayer)
	} else {
		{
			// shadow
			src, err := pm.FetchSource("../LooseSprites/Cursors.png")
			if err != nil {
				log.Printf("Error fetching terrain asset %v", err)
				return
			}
			sr := xnaRect(663, 1011, 41, 30)
			r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X*m.TileWidth - m.TileWidth, // centralize
				item.Key.Vector2.Y*m.TileHeight - 0, // vertical centralize
			})
			sb.Draw(img, r, src, sr.Min, treeLayer)
		}
		{
			// stump
			sr := xnaRect(32, 96, 16, 32)
			r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * m.TileWidth,
				item.Key.Vector2.Y*m.TileHeight - m.TileHeight, // stump offset
			})
			sb.Draw(img, r, src, sr.Min, treeLayer)
		}
		{
			// tree
			sr := image.Rect(0, 0, 48, 96)
			r := sr.Sub(sr.Min).Add(image.Point{
				item.Key.Vector2.X*m.TileWidth - m.TileWidth, // centralize
				item.Key.Vector2.Y*m.TileHeight - 80,         // stump offset
			})

			sb.Draw(img, r,
				maybeFlip(item.Value.TerrainFeature.Flipped, src, sr),
				sr.Min,
				treeLayer)
		}
	}
}
