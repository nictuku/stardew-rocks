package view

import (
	"fmt"
	"image"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

type fenceNeighbourComparison func(otherObject *parser.ObjectItem) bool

var fenceNeighbourLookupTable = []int{
	5, // normal pole
	0, // neighbour right
	2, // left
	4, // left +right
	3, // above
	6, // above + right
	8, // above + left
	7, // above + right + left
}

func fenceIndex(object *parser.ObjectItem, objects [][]*parser.ObjectItem, fn fenceNeighbourComparison) int {
	x := object.Key.Vector2.X
	y := object.Key.Vector2.Y
	index := 0
	neighbours := []neighbour{
		// 0 = normal
		{x: x, y: y - 1, bit: 4}, // neighbor above
		{x: x - 1, y: y, bit: 2}, // neighbor left
		{x: x + 1, y: y, bit: 1}, // neighbor right
	}
	for _, neighbour := range neighbours {
		if neighbour.y > 0 && neighbour.y < len(objects) {
			for _, otherObject := range objects[neighbour.y] {
				if otherObject.Key.Vector2.X == neighbour.x && fn(otherObject) {
					index = index | neighbour.bit
				}
			}
		}
	}
	return fenceNeighbourLookupTable[index]
}

func (s *screenshot) drawObject(pm *parser.Map, item *parser.ObjectItem, objects [][]*parser.ObjectItem) {
	var (
		tileHeight            = 16 // Width is 32 even for big craftables.
		sourcePath            = "../Maps/springobjects.png"
		placementCompensation = 0 // craftables are anchored at the top tile
	)
	obj := item.Value.Object
	switch obj.Type {
	case "Crafting":
		placementCompensation = 0
		switch {
		case obj.BigCraftable == true:
			tileHeight = 32
			sourcePath = "../TileSheets/Craftables.png"
			placementCompensation = -16
		case obj.XSIType == "Fence":
			if obj.WhichType == 4 {
				return
			}
			placementCompensation = -16
			sourcePath = fmt.Sprintf("../LooseSprites/Fence%d.png", obj.WhichType)
			tileHeight = 32
			obj.ParentSheetIndex = fenceIndex(item, objects, func(otherObject *parser.ObjectItem) bool {
				return obj.XSIType == otherObject.Value.Object.XSIType &&
					obj.WhichType == otherObject.Value.Object.WhichType
			})
		default:
			//log.Printf("do not yet understand this: %v", obj.XML)
		}
	}
	src, err := pm.FetchSource(sourcePath)
	if err != nil {
		// TODO: don't panic, but make sure that we only lookup safe locations.
		// Also cache the failure result so we don't have to check again.
		log.Printf("Error fetching asset %v: %v", sourcePath, err)
		return
	}
	srcBounds := src.Bounds()
	x0, y0 := tileCoordinates(obj.ParentSheetIndex, 16, tileHeight, srcBounds.Dx())
	sr := image.Rect(x0, y0, x0+16, y0+tileHeight)
	r := sr.Sub(sr.Min).Add(image.Point{
		item.Key.Vector2.X * 16,
		item.Key.Vector2.Y*16 + placementCompensation,
	})
	s.Draw(r, src, sr.Min, objectLayer)
}
