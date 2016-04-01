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

func treeAsset(terrainType string, treeType int, season string) string {

	if terrainType == "Tree" {
		if treeType == 3 && season == "summer" {
			season = "spring"
		} else if treeType == 6 {
			return "../TerrainFeatures/tree_palm.png"
		} else if treeType == 7 {
			return "../TerrainFeatures/mushroom_tree.png"
		}
		return fmt.Sprintf("../TerrainFeatures/tree%d_%v.png", treeType, season)
	} else if terrainType == "FruitTree" {
		return "../TileSheets/fruitTrees.png"
	} else {
		return "" // error?
	}

}

func drawTree(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image) {

	if item.Value.TerrainFeature.Type != "Tree" && item.Value.TerrainFeature.Type != "FruitTree" {
		return
	}
	p := treeAsset(item.Value.TerrainFeature.Type, item.Value.TerrainFeature.TreeType, season)
	src, err := pm.FetchSource(p)
	if err != nil {
		log.Printf("Error fetching terrain asset %v: %v", p, err)
		return
	}
	stage := item.Value.TerrainFeature.GrowthStage

	if item.Value.TerrainFeature.Type == "Tree" {
		drawRegularTree(pm, season, item, img, src, stage)
	} else if item.Value.TerrainFeature.Type == "FruitTree" {
		drawFruitTree(pm, season, item, img, src, stage)
	}

	return
}
func drawRegularTree(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image, src image.Image, stage int) {
	m := pm.TMX
	if stage < 5 {
		sr, ok := treeRects[stage]
		if !ok {
			log.Printf("Unknown tree rect for %v", item.Value.TerrainFeature.GrowthStage)
			return
		}
		var r image.Rectangle
		if stage < 3 {
			r = sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * m.TileWidth, item.Key.Vector2.Y * m.TileHeight})
		} else {
			r = midLeftAlign(sr, image.Point{item.Key.Vector2.X * m.TileWidth, item.Key.Vector2.Y * m.TileHeight})
		}
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

func drawFruitTree(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image, src image.Image, stage int) {
	m := pm.TMX

	stump := false
	col := 4

	if stage < 4 {
		col = stage
	} else if !stump {
		var season_num_map = map[string]int{
			"spring": 0,
			"summer": 1,
			"fall":   2,
			"winter": 3,
		}
		season_num, ok := season_num_map[season]
		if !ok {
			log.Printf("Unknown season for %v", season)
			return
		}
		col = 4 + season_num
	} else {
		// A stump.  Draw a winter tree for now.
		col = 7
	}
	row := item.Value.TerrainFeature.TreeType

	// Rectangle around the tree.  This is only valid for live trees.
	sr := xnaRect(col*m.TileWidth*3, row*m.TileHeight*5, m.TileWidth*3, m.TileHeight*5)

	// Tree rects are all 3 tiles wide by 5 tiles tall, but the center tile on the bottom is the footprint of the tree's tile.
	var r image.Rectangle = sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * m.TileWidth, item.Key.Vector2.Y * m.TileHeight}).Sub(image.Point{m.TileWidth, m.TileHeight * 4})

	sb.Draw(img, r, src, sr.Min, treeLayer)
}
