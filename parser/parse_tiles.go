package parser

import (
	"fmt"
	"image"
	"log"
	"os"
	"path"
	"sync"

	"github.com/salviati/go-tmx/tmx"
)

var (
	farmCache     *Map
	farmCacheOnce sync.Once
)

const farmFileMap = "C:/Users/Yves/Downloads/XNBNode/Content/TMX/Farm.tmx"

// Map represents a tile map loaded from disk and cached in memory.
type Map struct {
	TMX *tmx.Map
	// source determines where the map was loaded from, which is needed as a reference
	// for loading other assets from the TMX.
	source string

	mu           sync.Mutex
	imageSources map[string]image.Image
}

func (m *Map) FetchSource(s string) (image.Image, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	img, ok := m.imageSources[s]
	if ok {
		return img, nil
	}

	f, err := os.Open(path.Join(path.Dir(m.source), s))
	if err != nil {
		return nil, err
	}
	img, _, err = image.Decode(f)
	if err == nil {
		m.imageSources[s] = img
	}
	log.Print("found", s)
	return img, err
}

func LoadFarmMap() *Map {
	farmCacheOnce.Do(func() {
		f, err := os.Open(farmFileMap)
		if err != nil {
			panic(err)
		}
		m, err := tmx.Read(f)
		if err != nil {
			panic(err)
		}
		fmt.Printf("MAP HEIGHT: %v\n", m.Height)
		fmt.Printf("MAP WIDTH: %v\n", m.Width)
		fmt.Printf("TILE HEIGHT, WIDTH: %v, %v\n", m.TileHeight, m.TileWidth)
		farmCache = &Map{TMX: m, source: farmFileMap, imageSources: map[string]image.Image{}}
	})
	return farmCache
	/*
		    for _, layer := range m.Layers {
				fmt.Printf("Layer: %v", layer.Name)
				if layer.Name != "Front" {
					continue
				}

				for pos, tiles := range layer.DecodedTiles {
					fmt.Printf("==\nPos %v, Tile ID %+v\n", pos, tiles.ID)
					fmt.Printf("Tiles: %#v\n", tiles)
					if tiles.Tileset != nil {
						fmt.Printf(" tileset: %+v\n", tiles.Tileset)
					}
				}

			}
	*/
}
