package main

import (
	"log"
	"os"

	"github.com/nictuku/stardew-rocks/parser"
	"github.com/nictuku/stardew-rocks/view"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatalf("Expected `%v <xml save file>`", os.Args[0])
	}
	farm := parser.LoadFarmMap()

	sg, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}

	gameSave, err := parser.ParseSaveGame(sg)
	if err != nil {
		log.Fatal(err)
	}
	view.WriteImage(farm, gameSave, os.Stdout)
}
