package view

import (
	"os"
	"testing"

	"fmt"
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
	farm := parser.LoadFarmMap()

	for _, name := range []string{
		"Aerlia_1458278945",
		"Dristan_1458278710",
		"MsJake_116822164",
		"Jack_1458408909",
	} {

		sg, err := os.Open("../assets/saves/" + name)
		if err != nil {
			t.Fatal(err)
		}

		gameSave, err := parser.ParseSaveGame(sg)
		if err != nil {
			t.Fatal(err)
		}
		f, err := os.OpenFile(fmt.Sprintf("map-%v.png", name), os.O_CREATE|os.O_WRONLY, 0666)
		if err != nil {
			panic(err)
		}
		WriteImage(farm, gameSave, f)
		f.Close()
	}
}
