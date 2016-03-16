package parser

import (
	"encoding/xml"
	"fmt"
	"io"
	"strconv"
	"strings"
)

type Document struct {
	SaveGame
}

type SaveGame struct {
	Locations []Location `xml:"locations"`
}

type Location struct {
	GameLocations []GameLocation `xml:"GameLocation"`
	XML           string         `xml:",innerxml"`
}

type GameLocation struct {
	Name            string          `xml:"name"`
	Objects         Objects         `xml:"objects"`
	TerrainFeatures TerrainFeatures `xml:"terrainFeatures"`
	XML             string          `xml:",innerxml"`
}

type Objects struct {
	Items []ObjectItem `xml:"item"`
}

type TerrainFeatures struct {
	Items []TerrainItem `xml:"item"`
	XML   string        `xml:",innerxml"`
}

type TerrainItem struct {
	Key   ItemKey          `xml:"key"`
	Value TerrainItemValue `xml:"value"`
}

func (i TerrainItem) ItemName() string {
	return "tree:" + strconv.Itoa(i.Value.TerrainFeature.TreeType)
}

func (i TerrainItem) X() int {
	return i.Key.Vector2.X
}

func (i TerrainItem) Y() int {
	return i.Key.Vector2.Y
}

type ObjectItem struct {
	Key   ItemKey   `xml:"key"`
	Value ItemValue `xml:"value"`
}

func (i ObjectItem) ItemName() string {
	return i.Value.Object.Name
}

func (i ObjectItem) X() int {
	return i.Key.Vector2.X
}

func (i ObjectItem) Y() int {
	return i.Key.Vector2.Y
}

type Item interface {
	ItemName() string
	X() int
	Y() int
}

type TerrainItemValue struct {
	TerrainFeature TerrainFeature
}

type TerrainFeature struct {
	TreeType int `xml:"treeType"`
}

type ItemValue struct {
	Object Object
}

type Object struct {
	Name         string `xml:"name"`
	TileLocation Vector `xml:"tileLocation"`
}

type ItemKey struct {
	Vector2 Vector
}

type Vector struct {
	X int
	Y int
}

type FarmMap struct {
	Loc [100][100]string
}

func Parse(r io.Reader) (*FarmMap, error) {

	dec := xml.NewDecoder(r)
	v := Document{}
	if err := dec.Decode(&v); err != nil {
		return nil, fmt.Errorf("error: %v", err)
	}
	var farm GameLocation
	var farmMap FarmMap
	for _, loc := range v.Locations {
		for _, gameloc := range loc.GameLocations {
			if gameloc.Name == "Farm" {
				farm = gameloc
			}
		}
	}
	if farm.Name == "" {
		return nil, fmt.Errorf("Could not find farm in game save")
	}

	var allObjects []Item
	for _, i := range farm.TerrainFeatures.Items {
		allObjects = append(allObjects, i)
	}
	for _, i := range farm.Objects.Items {
		allObjects = append(allObjects, i)
	}
	for _, object := range allObjects {
		if object.Y() >= len(farmMap.Loc) || object.X() >= len(farmMap.Loc[object.Y()]) {
			return nil, fmt.Errorf("Found object vector location outside normal bounds: X=%d, Y=%d", object.Y(), object.X())
		}
		farmMap.Loc[object.Y()][object.X()] = object.ItemName()

	}
	return &farmMap, nil
}

func ASCIIImage(farmMap *FarmMap) {
	for _, j := range farmMap.Loc {
		stuff := []string{}
		for _, what := range j {
			if strings.HasPrefix(what, "tree") {
				fmt.Print("T")
				stuff = append(stuff, what)
			} else if what != "" {
				fmt.Print("x")
				stuff = append(stuff, what)
			} else {
				fmt.Print(".")
			}
		}
		p := fmt.Sprint(stuff)
		if len(p) > 80 {
			p = p[0:79]
		}
		fmt.Print(p)
		fmt.Println()
	}
}
