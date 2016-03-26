// This program looks at all save games stored in the database and generates
// new screenshots with the latest renderer.
package main

import (
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/view"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <farmer regexp>`", os.Args[0])
	}
	farm := parser.LoadFarmMap()

	log.Printf("Processing %v", os.Args[1])



	sg, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	f, err := os.OpenFile(os.Args[2], os.O_CREATE|os.O_WRONLY, 0600)
	if err != nil {
		log.Fatal(err)
	}

	gameSave, err := parser.ParseSaveGame(sg)
	if err != nil {
		log.Fatal(err)
	}
	view.WriteImage(farm, gameSave, f)
}
