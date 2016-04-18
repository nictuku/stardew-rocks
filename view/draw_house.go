package view

import (
	"image"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

func (s *screenshot) drawHouse(pm *parser.Map, upgradeLevel int) {
	src, err := pm.FetchSource("../Buildings/houses.png")
	if err != nil {
		log.Printf("Error fetching house asset: %v", err)
		panic(err)
	}
	sr := xnaRect(0, 144*upgradeLevel, 160, 144)
	r := sr.Sub(sr.Min).Add(image.Point{930, 130})
	s.Draw(r, src, sr.Min, houseLayer)
}

func (s *screenshot) drawGreenhouse(pm *parser.Map, fixedGreenhouse bool) {
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
	s.Draw(r, src, sr.Min, greenHouseLayer)
}
