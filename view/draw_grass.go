package view

import (
	"image"
	"image/draw"
	"log"
	"math/rand"

	"github.com/nictuku/stardew-rocks/parser"
)

func grassOffset(grassType int, season string) int {
	switch grassType {
	case 1:
		switch season {
		case "spring":
			return 0
		case "summer":
			return 20
		case "fall":
			return 40
		}
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

func grassRect(idx, grassType int, season string) image.Rectangle {
	return xnaRect(idx, grassOffset(grassType, season), 15, 20)
}

func drawGrass(pm *parser.Map, season string, item *parser.TerrainItem, img draw.Image) {
	if item.Value.TerrainFeature.Type != "Grass" {
		return
	}
	var whichWeed [4]int

	if item.Value.TerrainFeature.NumberOfWeeds > len(whichWeed) {
		log.Printf("Too many NumberOfWeeds with value %d", item.Value.TerrainFeature.NumberOfWeeds)
		return
	}

	for i := range whichWeed {
		whichWeed[i] = rand.Intn(3)
	}

	var offsetWeeds [4][4]int

	for i, b := range offsetWeeds {
		for j := range b {
			offsetWeeds[i][j] = rand.Intn(5) - 2
		}
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

		sr := grassRect(weed * 15, item.Value.TerrainFeature.GrassType, season)
		r := sr.Sub(sr.Min).Add(image.Point{item.Key.Vector2.X*m.TileWidth + int(float32((i % 2) * m.TileWidth) / 2 + (float32(offsetWeeds[i][2]) - 6.5)),
			item.Key.Vector2.Y*m.TileHeight - i/2*m.TileHeight/2 + offsetWeeds[i][3] + 10.,
		})

		if flipWeed[i] {
			sb.Draw(img, r, maybeFlip(flipWeed[i], src, sr), image.Point{0, 0}, grassLayer)
		} else {
			sb.Draw(img, r, maybeFlip(flipWeed[i], src, sr), sr.Min, grassLayer)
		}
	}
}
