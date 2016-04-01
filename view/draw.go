package view

import (
	"fmt"
	"image"
	"image/color"
	_ "image/jpeg"
	"image/png"
	"io"
	"math/rand"
	"time"

	"github.com/disintegration/imaging"
	"github.com/nictuku/stardew-rocks/parser"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

const (
	backLayer      = 0.01
	buildingsLayer = 0.02
	flooringLayer  = 0.02
	pathsLayer     = 0.03
	frontLayer     = 0.4

	grassLayer      = 0.5
	treeLayer       = 0.5
	objectLayer     = 0.5
	greenHouseLayer = 0.5
	houseLayer      = 0.5 // after front, same as objects

	alwaysFrontLayer = 1.0
)

func xnaRect(x0, y0, width, height int) image.Rectangle {
	return image.Rect(x0, y0, x0+width, y0+height)
}

func tileCoordinates(id int, tileWidth, tileHeight, tilemapWidth int) (x0, y0 int) {
	numColumns := tilemapWidth / tileWidth
	y0 = id / numColumns * tileHeight
	x0 = id % numColumns * tileWidth
	return x0, y0
}

var mask = image.NewUniform(color.Alpha{255})

func cropAndMaybeFlip(flip bool, img image.Image, r image.Rectangle) image.Image {
	img = imaging.Crop(img, r)
	if flip {
		return imaging.FlipH(img)
	}
	return img
}

type neighbour struct {
	x, y, bit int
}

func topLeftAlign(sr image.Rectangle, dp image.Point) image.Rectangle {
	r := sr.Sub(sr.Min)
	return image.Rectangle{
		image.Point{dp.X, dp.Y - r.Dy()},
		image.Point{dp.X + r.Max.X, dp.Y},
	}
}

func midLeftAlign(sr image.Rectangle, dp image.Point) image.Rectangle {
	r := sr.Sub(sr.Min)
	return image.Rectangle{
		image.Point{dp.X, dp.Y - r.Dy()/2},
		image.Point{dp.X + r.Max.X, dp.Y + r.Dy()/2},
	}
}

func bottomLeftAlign(sr image.Rectangle, dp image.Point) image.Rectangle {
	r := sr.Sub(sr.Min)
	return image.Rectangle{
		image.Point{dp.X, dp.Y},
		image.Point{dp.X + r.Max.X, dp.Y + r.Dy()},
	}
}

func WriteImage(pm *parser.Map, sg *parser.SaveGame, w io.Writer) error {
	var farm *parser.GameLocation
	for _, gameloc := range sg.Locations.GameLocations {
		if gameloc.Name == "Farm" {
			farm = &gameloc
			break
		}
	}

	if farm == nil {
		return fmt.Errorf("farm not found for %v", sg.Player.Name)
	}

	// TODO: do not trust the user input. Don't hit files or slice indexes based on data.
	m := pm.TMX

	buildings := make([][]*parser.Building, m.Height)
	for i := range farm.Buildings {
		building := farm.Buildings[i]
		y := building.TileY
		// TODO: write more robust and general code for this.
		if building.BuildingType == "Stable" {
			// For this value, the each "Tile High" represents 32 pixels, or 2 real tiles.
			// Most likely the game considers 32 pixel per map tile, but works with map coordinates of 16 pixel units.
			y += (building.TilesHigh * 2)
		}
		if y >= len(buildings) || y < 0 {
			continue
		}
		buildings[y] = append(buildings[y], &building)
	}

	// Order items and objects to be displayed based on their Y order. Items with a higher Y should be drawn last.
	items := make([][]*parser.TerrainItem, m.Height)
	for i := range farm.TerrainFeatures.Items {
		item := farm.TerrainFeatures.Items[i] // separate pointer for each item
		if item.Y() >= len(items) || item.Y() < 0 {
			continue
		}
		items[item.Y()] = append(items[item.Y()], &item)
	}
	objects := make([][]*parser.ObjectItem, m.Height)
	for i := range farm.Objects.Items {
		object := farm.Objects.Items[i] // separate pointer for each item
		if object.Y() >= len(objects) || object.Y() < 0 {
			continue
		}
		objects[object.Y()] = append(objects[object.Y()], &object)
	}

	img := image.NewRGBA(image.Rect(0, 0, m.Width*m.TileWidth, m.Height*m.TileHeight))
	sb.Start()

	// Note that the order we issue draw commands must match the foreground/background order.
	// At a high level, the expected order is:
	// Back Layer; Buildings Layer; Houses; Objects; TerrainFeatures; Front Layer; AlwaysFront Layer

	for y := 0; y < m.Height; y++ {
		if y == 0 {
			drawHouse(pm, img, sg.Player.HouseUpgradeLevel)
		}
		if y == 15 {
			fixedGreenhouse := false
			for _, mail := range sg.Player.MailReceived {
				if mail == "ccPantry" {
					fixedGreenhouse = true
				}
			}
			drawGreenhouse(pm, img, fixedGreenhouse)
		}
		for _, building := range buildings[y] {
			drawBuilding(pm, building, img)
		}
		for _, item := range items[y] {
			drawTree(pm, sg.CurrentSeason, item, img)
		}
		for _, object := range objects[y] {
			drawObject(pm, object, img, objects)
		}
		for _, item := range items[y] {
			drawGrass(pm, sg.CurrentSeason, item, img)
			drawFlooring(pm, item, img, items)
			drawHoeDirt(pm, sg.CurrentSeason, item, img, items)
		}
		for x := 0; x < m.Width; x++ {
			for _, layer := range m.Layers {
				var layerOrder float32
				switch layer.Name {
				case "Back":
					layerOrder = backLayer
				case "Buildings":
					layerOrder = buildingsLayer
				case "Paths":
					continue // Don't draw paths.
				case "Front":
					layerOrder = frontLayer
				case "AlwaysFront":
					layerOrder = alwaysFrontLayer
				}
				drawTile(pm, sg.CurrentSeason, layer.DecodedTiles[y*m.Width+x], img, x, y, layerOrder)
			}
		}
	}

	sb.Flush()

	if err := png.Encode(w, img); err != nil {
		return err
	}
	return nil
}
