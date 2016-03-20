package view

import (
	"fmt"
	"image"
	"image/color"
	"image/draw"
	_ "image/jpeg"
	"image/png"
	"io"
	"log"
	"math/rand"
	"time"

	"github.com/disintegration/imaging"
	"github.com/nictuku/stardew-rocks/parser"
	"github.com/salviati/go-tmx/tmx"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

const (
	backLayer        = 0.01
	buildingsLayer   = 0.02
	flooringLayer    = 0.02
	pathsLayer       = 0.03
	grassLayer       = 0.5
	treeLayer        = 0.5
	frontLayer       = 0.5
	objectLayer      = 0.5
	greenHouseLayer  = 0.5
	houseLayer       = 0.6 // after front, same as objects
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

var sb = &SpriteBatch{}

var treeRects = map[int]image.Rectangle{
	0: xnaRect(32, 128, 16, 16),
	1: xnaRect(0, 128, 16, 16),
	2: xnaRect(16, 128, 16, 16),
	3: xnaRect(0, 96, 16, 32),
	4: xnaRect(0, 96, 16, 32),
}

func treeAsset(treeType int, season string) string {
	return fmt.Sprintf("../TerrainFeatures/tree%d_%v.png", treeType, season) // TODO: other seasons
}

func grassOffset(grassType int) int {
	// TODO: other seasons
	switch grassType {
	case 1:
		return 0
	case 2:
		return 60
	case 3:
		return 80
	case 4:
		return 100
	}
	return 0
}

func grassRect(idx, grassType int) image.Rectangle {
	return xnaRect(idx, grassOffset(grassType), 15, 20)
}

func maybeFlip(flip bool, img image.Image, r image.Rectangle) image.Image {
	if flip {
		return imaging.FlipH(imaging.Crop(img, r))
	}
	return img
}

func flooringRect(whichFloor int) image.Rectangle {
	return xnaRect(
		whichFloor%4*64,
		whichFloor/4*64,
		16, 16)
}

func drawFlooring(pm *parser.Map, item *parser.TerrainItem, img draw.Image) {
	m := pm.TMX
	if item.Value.TerrainFeature.Type != "Flooring" {
		return
	}
	src, err := pm.FetchSource("../TerrainFeatures/Flooring.png")
	if err != nil {
		log.Fatalf("Error fetching image asset %v", err)
	}
	sr := flooringRect(item.Value.TerrainFeature.WhichFloor)
	r := sr.Sub(sr.Min).Add(image.Point{
		// TODO: support for neighbor connections (also missing for fences).
		item.Key.Vector2.X * m.TileWidth,
		item.Key.Vector2.Y * m.TileHeight,
	})
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, flooringLayer)
}

func drawHouse(pm *parser.Map, img draw.Image, upgradeLevel int) {
	src, err := pm.FetchSource("../Buildings/houses.png")
	if err != nil {
		log.Printf("Error fetching house asset: %v", err)
		panic(err)
	}
	sr := xnaRect(0, 144*upgradeLevel, 160, 144)
	r := sr.Sub(sr.Min).Add(image.Point{930, 130})
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, houseLayer)
}

func drawGreenhouse(pm *parser.Map, img draw.Image, fixedGreenhouse bool) {
	src, err := pm.FetchSource("../Buildings/houses.png")
	if err != nil {
		log.Printf("Error fetching houses asset: %v", err)
		panic(err)
	}
	y := 0
	if fixedGreenhouse {
		y = 160
	}
	sr := xnaRect(160, y, 112, 160)
	r := sr.Sub(sr.Min).Add(image.Point{400, 96})
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, greenHouseLayer)
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
		sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, treeLayer)
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
			sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, treeLayer)
		}
		{
			// stump
			sr := xnaRect(32, 96, 16, 32)
			r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X * m.TileWidth,
				item.Key.Vector2.Y*m.TileHeight - m.TileHeight, // stump offset
			})
			sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, treeLayer)
		}
		{
			// tree
			sr := image.Rect(0, 0, 48, 96)
			r := sr.Sub(sr.Min).Add(image.Point{
				item.Key.Vector2.X*m.TileWidth - m.TileWidth, // centralize
				item.Key.Vector2.Y*m.TileHeight - 80,         // stump offset
			})

			sb.DrawMask(img, r,
				maybeFlip(item.Value.TerrainFeature.Flipped, src, sr),
				sr.Min, mask, sr.Min, draw.Over,
				treeLayer)
		}
	}
}

func drawHoeDirt(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image) {
	// TODO: neighbor detection.
	if item.Value.TerrainFeature.Type != "HoeDirt" {
		return
	}
	if item.Value.TerrainFeature.State != 1 {
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
	sr := image.Rect(0, 0, 16, 16)
	r := sr.Sub(sr.Min).Add(image.Point{
		item.Key.Vector2.X * m.TileWidth,
		item.Key.Vector2.Y * m.TileHeight,
	})
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, objectLayer)

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
			x0 = (crop.CurrentPhase + 2) * 16
			if crop.RowInSpriteSheet%2 != 0 {
				x0 += 128
			}
		}

		sr := xnaRect(x0, (crop.RowInSpriteSheet/2)*32, 16, 32)
		r := sr.Sub(sr.Min).Add(image.Point{
			item.Key.Vector2.X * m.TileWidth,
			item.Key.Vector2.Y*m.TileHeight - 16, // because using tile height 32 above
		})
		sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, objectLayer)
	}
}

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

func drawObject(pm *parser.Map, item *parser.ObjectItem, img draw.Image) {
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
			obj.ParentSheetIndex = 5 // This is a pole with no neighbors.
		default:
			//log.Printf("do not yet understand this: %v", obj.XML)
		}
	}
	src, err := pm.FetchSource(sourcePath)
	if err != nil {
		// TODO: don't panic, but make sure that we only lookup safe locations.
		// Also cache the failure result so we don't have to check again.
		log.Printf("Error fetching asset %v: %v", sourcePath, err)
		panic(err)
	}
	srcBounds := src.Bounds()

	x0, y0 := tileCoordinates(obj.ParentSheetIndex, 16, tileHeight, srcBounds.Dx())
	sr := image.Rect(x0, y0, x0+16, y0+tileHeight)
	r := sr.Sub(sr.Min).Add(image.Point{
		item.Key.Vector2.X * 16,
		item.Key.Vector2.Y*16 + placementCompensation,
	})
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, objectLayer)
}

func drawTile(pm *parser.Map, season string, tile *tmx.DecodedTile, img draw.Image, x, y int, layer float32) {
	if tile.IsNil() {
		return
	}
	m := pm.TMX

	// Fetch tile from tileset.
	src, err := pm.FetchSeasonSource(tile.Tileset.Image.Source, season)
	if err != nil {
		log.Printf("Error fetching image asset %v: %v", tile.Tileset.Image.Source, err)
		return
	}
	srcBounds := src.Bounds()
	x0, y0 := tileCoordinates(int(tile.ID), m.TileWidth, m.TileHeight, srcBounds.Dx())
	sr := image.Rect(x0, y0, x0+m.TileHeight, y0+m.TileWidth)
	r := sr.Sub(sr.Min).Add(image.Point{x * m.TileWidth, y * m.TileHeight})
	// DrawMask with draw.Over and an alpha channel ensure the background is transparent.
	// Anyway, it works.
	sb.DrawMask(img, r, src, sr.Min, mask, sr.Min, draw.Over, layer)
}

func WriteImage(pm *parser.Map, sg *parser.SaveGame, w io.Writer) {
	var farm *parser.GameLocation
	for _, gameloc := range sg.Locations.GameLocations {
		if gameloc.Name == "Farm" {
			farm = &gameloc
			break
		}
	}

	if farm == nil {
		log.Printf("farm not found for %v", sg.Player.Name)
		return
	}

	// TODO: do not trust the user input. Don't hit files or slice indexes based on data.
	m := pm.TMX

	// Order items and objects to be displayed based on their Y order. Items with a higher Y should be drawn last.
	items := make([][]*parser.TerrainItem, m.Height)
	for i := range farm.TerrainFeatures.Items {
		item := farm.TerrainFeatures.Items[i] // separate pointer for each item
		if item.Y() >= len(items) {
			continue
		}
		items[item.Y()] = append(items[item.Y()], &item)
	}
	objects := make([][]*parser.ObjectItem, m.Height)
	for i := range farm.Objects.Items {
		object := farm.Objects.Items[i] // separate pointer for each item
		if object.X() >= len(objects) {
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
		if y == 20 {
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
		for _, object := range objects[y] {
			drawObject(pm, object, img)
		}
		for _, item := range items[y] {
			drawTree(pm, sg.CurrentSeason, item, img)
			drawGrass(pm, item, img)
			drawFlooring(pm, item, img)
			drawHoeDirt(pm, sg.CurrentSeason, item, img)
		}
		for x := 0; x < m.Width; x++ {
			for _, layer := range m.Layers { // Layers are apparently ordered correctly.
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
		panic(err)
	}
}
