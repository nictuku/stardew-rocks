package view

import (
	"fmt"
	"os"
	"testing"

	"github.com/nictuku/stardew-rocks/parser"
)

func TestTileCoordinate(t *testing.T) {
	x0, y0 := tileCoordinates(117, 16, 16, 400)
	if x0 != 272 {
		t.Errorf("wanted x0 %v, got %v", 272, x0)
	}
	if y0 != 64 {
		t.Errorf("wanted y0 %v, got %v", 64, y0)
	}
}
func TestLoadTile(t *testing.T) {
	farm := parser.LoadFarm()
	fmt.Printf("%v\n", farm.TMX.Height)
	mapFile := fmt.Sprintf("map-%09d.png", 2131232132)
	f, err := os.OpenFile(mapFile, os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		panic(err)
	}
	WriteImage(farm, f)
	f.Close()
}
