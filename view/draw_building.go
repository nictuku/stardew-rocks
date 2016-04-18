package view

import (
	"fmt"
	"image"
	"log"

	"github.com/nictuku/stardew-rocks/parser"
)

func (s *screenshot) drawBuilding(pm *parser.Map, building *parser.Building) {
	if building.Type == "" && building.BuildingType == "" {
		return
	}

	// TODO: add gradient shadow.

	m := pm.TMX
	sourcePath := fmt.Sprintf("../Buildings/%v.png", building.BuildingType)
	src, err := pm.FetchSource(sourcePath)
	if err != nil {
		log.Printf("Error fetching asset %v: %v", sourcePath, err)
		return
	}
	switch {
	case building.Type == "Coop": // Also works for building.BuildingType = Deluxe Coop
		sr := xnaRect(16, 112, 16, 16)
		r := sr.Sub(sr.Min).Add(image.Point{
			(building.TileX + building.AnimalDoor.X) * m.TileWidth,
			(building.TileY + building.AnimalDoor.Y) * m.TileHeight,
		})
		s.Draw(r, src, sr.Min, objectLayer)

		// Animal door
		sr = xnaRect(0, 112, 16, 16)
		r = sr.Sub(sr.Min).Add(image.Point{
			((building.TileX + building.AnimalDoor.X) * m.TileWidth) + 16, // TODO: Open door
			(building.TileY + building.AnimalDoor.Y) * m.TileHeight,
		})
		s.Draw(r, src, sr.Min, objectLayer)

		// Coop
		sr = xnaRect(0, 0, 96, 112)
		dp := image.Point{
			(building.TileX * m.TileWidth),
			building.TileY*m.TileHeight + building.TilesHigh*m.TileHeight,
		}
		s.Draw(topLeftAlign(sr, dp), src, sr.Min, houseLayer)
	case building.Type == "Barn": // Also works for building.BuildingType == Deluxe Barn
		// Door. TODO: open or closed.
		sr := xnaRect(0, 112, 32, 16)
		r := sr.Sub(sr.Min).Add(image.Point{
			(building.TileX + building.AnimalDoor.X) * m.TileWidth,
			(building.TileY + building.AnimalDoor.Y) * m.TileHeight,
		})
		// Top part of the door.
		s.Draw(r, src, sr.Min, objectLayer)
		sr = xnaRect(0, 112, 32, 16)
		r = sr.Sub(sr.Min).Add(image.Point{
			(building.TileX + building.AnimalDoor.X) * m.TileWidth,
			(building.TileY + building.AnimalDoor.Y - 1) * m.TileHeight,
		})
		s.Draw(r, src, sr.Min, objectLayer)
		// Barn
		sr = xnaRect(0, 0, 112, 112)
		dp := image.Point{
			(building.TileX * m.TileWidth),
			building.TileY*m.TileHeight + building.TilesHigh*m.TileHeight,
		}
		s.Draw(topLeftAlign(sr, dp), src, sr.Min, houseLayer)
	case building.BuildingType == "Silo":
		sr := xnaRect(0, 0, 48, 128)
		dp := image.Point{
			building.TileX * m.TileWidth,
			(building.TileY - 1) * m.TileHeight,
		}
		s.Draw(midLeftAlign(sr, dp), src, sr.Min, houseLayer)
	case building.BuildingType == "Well":
		sr := xnaRect(0, 0, 48, 80)
		dp := image.Point{
			building.TileX * m.TileWidth,
			(building.TileY)*m.TileHeight + m.TileHeight/2,
		}
		s.Draw(midLeftAlign(sr, dp), src, sr.Min, houseLayer)
	case building.BuildingType == "Slime Hutch":
		sr := xnaRect(0, 0, 176, 144)
		dp := image.Point{
			building.TileX * m.TileWidth,
			(building.TileY+1)*m.TileHeight + m.TileHeight/2,
		}
		s.Draw(midLeftAlign(sr, dp), src, sr.Min, houseLayer)
	case building.BuildingType == "Stable":
		sr := xnaRect(0, 0, 64, 96)
		dp := image.Point{
			building.TileX * m.TileWidth,
			(building.TileY - 1) * m.TileHeight,
		}
		s.Draw(midLeftAlign(sr, dp), src, sr.Min, houseLayer)

	default:
		return
	}
}
