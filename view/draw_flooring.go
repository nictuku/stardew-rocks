package view

import (
	"image"
	"image/draw"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

func flooringRect(whichFloor int, indexUsed int) image.Rectangle {
	return xnaRect(
		whichFloor%4*64+indexUsed%4*16,
		whichFloor/4*64+indexUsed/4*16,
		16, 16)
}

type neighbourComparison func(otherItem *parser.TerrainItem) bool

var flooringNeighbourLookupTable = []int{0, 4, 13, 1, 15, 3, 14, 2, 12, 8, 9, 5, 11, 7, 10, 6}

func getFlooringIndex(item *parser.TerrainItem, items [][]*parser.TerrainItem, fn neighbourComparison) int {
	x := item.Key.Vector2.X
	y := item.Key.Vector2.Y
	index := 0
	neighbours := []neighbour{
		{x: x, y: y - 1, bit: 8},
		{x: x - 1, y: y, bit: 4},
		{x: x + 1, y: y, bit: 2},
		{x: x, y: y + 1, bit: 1}}
	for _, neighbour := range neighbours {
		if neighbour.y > 0 && neighbour.y < len(items) {
			for _, otherItem := range items[neighbour.y] {
				if otherItem.Key.Vector2.X == neighbour.x && fn(otherItem) {
					index = index | neighbour.bit
				}
			}
		}
	}
	return flooringNeighbourLookupTable[index]
}

func drawFlooring(pm *parser.Map, item *parser.TerrainItem, img draw.Image, items [][]*parser.TerrainItem) {
	m := pm.TMX
	if item.Value.TerrainFeature.Type != "Flooring" {
		return
	}
	src, err := pm.FetchSource("../TerrainFeatures/Flooring.png")
	if err != nil {
		log.Fatalf("Error fetching image asset %v", err)
	}
	indexUsed := getFlooringIndex(item, items, func(otherItem *parser.TerrainItem) bool {
		return otherItem.Value.TerrainFeature.Type == "Flooring" &&
			otherItem.Value.TerrainFeature.WhichFloor == item.Value.TerrainFeature.WhichFloor
	})
	sr := flooringRect(item.Value.TerrainFeature.WhichFloor, indexUsed)
	r := sr.Sub(sr.Min).Add(image.Point{
		// TODO: support for neighbor connections (also missing for fences).
		item.Key.Vector2.X * m.TileWidth,
		item.Key.Vector2.Y * m.TileHeight,
	})
	sb.Draw(img, r, src, sr.Min, flooringLayer)
}
