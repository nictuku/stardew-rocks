package view

import (
	"image"
	"image/draw"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

func drawHoeDirt(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image, items [][]*parser.TerrainItem) {
	// TODO: neighbor detection.
	if item.Value.TerrainFeature.Type != "HoeDirt" {
		return
	}

	m := pm.TMX

	// Fetch tile from tileset.
	p := "../TerrainFeatures/hoeDirt.png"
	if season == "winter" {
		p = "../TerrainFeatures/hoeDirtSnow.png"
	}
	src, err := pm.FetchSource(p)
	if err != nil {
		log.Printf("Error fetching image asset %v: %v", p, err)
		return
	}

	indexUsed := getFlooringIndex(item, items, func(otherItem *parser.TerrainItem) bool {
		return otherItem.Value.TerrainFeature.Type == "HoeDirt" && otherItem.Value.TerrainFeature.State == item.Value.TerrainFeature.State
	})
	x := indexUsed % 4 * 16 // TODO: +64 if watered.
	sr := image.Rect(x, indexUsed/4*16, indexUsed%4*16+16, indexUsed/4*16+16)
	r := sr.Sub(sr.Min).Add(image.Point{
		item.Key.Vector2.X * m.TileWidth,
		item.Key.Vector2.Y * m.TileHeight,
	})
	sb.Draw(img, r, src, sr.Min, flooringLayer)

	crop := item.Value.TerrainFeature.Crop

	if crop.IndexOfHarvest != 0 { // Not sure if this is the best way.

		// The sprite sheet is divided in two columns.
		// row=0 means first plant in the sheet, on the top left.
		// row=1 means the second plant, which starts at X=128 pixels
		// row=4 is in the second row *in the image*, or Y=32, but also starting at 128 pixels.

		p := "../TileSheets/crops.png"

		src, err := pm.FetchSource(p)
		if err != nil {
			log.Printf("Error fetching image asset %v: %v", p, err)
			return
		}
		x0 := 0
		if crop.FullyGrown {
			if crop.DaysOfCurrentPhase <= 0 {
				x0 = 6 * 16
			} else {
				x0 = 7 * 16
			}

		} else {
			x0 = (crop.CurrentPhase + 1) * 16
		}
		if crop.RowInSpriteSheet%2 != 0 {
			x0 += 128
		}
		sr := xnaRect(x0, (crop.RowInSpriteSheet/2)*32, 16, 32)
		r := sr.Sub(sr.Min).Add(image.Point{
			item.Key.Vector2.X * m.TileWidth,
			item.Key.Vector2.Y*m.TileHeight - 16, // because using tile height 32 above
		})
		sb.Draw(img, r, src, sr.Min, objectLayer)
	}
}
