// This tool generates a screenshot on demand for a save game specified in the command-line.
// Unfortunately it does not work stand-alone - it needs access to the game assets, which we
// don't distribute to respect CA's copyright over his art.
package main

import (
	"flag"
	"log"
	"os"

	"fmt"

	"github.com/nictuku/stardew-rocks/view"
	"github.com/nictuku/stardew-rocks/parser"
)

func main() {
	flag.Parse()
	if flag.NArg() != 1 {
		log.Fatalf("Expected `%v <save game>`", os.Args[0])
	}
	saveFile := os.Args[1]
	sg, err := os.Open(saveFile)
	if err != nil {
		log.Fatal(err)
	}
	// This requires access to a TMX of the Farm map. That involves:
	// - unpacking the game's assets
	// - converting the tile map to TMX format since what's what our tool supports.
        farm := parser.LoadFarmMap()
	gameSave, err := parser.ParseSaveGame(sg)
	if err != nil {
		log.Fatal(err)
	}
	mf := fmt.Sprintf("%v.png", saveFile)
	f, err := os.OpenFile(mf, os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatalf("Failed to write to %v: %v", mf, err)
	}
	log.Printf("Writing screenshot at %v", mf)
	view.WriteImage(farm, gameSave, f)
	f.Close()
	log.Print("Done")
}
