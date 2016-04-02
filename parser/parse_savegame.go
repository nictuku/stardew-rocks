package parser

import (
	"encoding/xml"
	"fmt"
	"io"
	"strconv"
)

type Document struct {
	SaveGame
}

type SaveGame struct {
	Player              Player    `xml:"player"`
	Locations           Locations `xml:"locations"`
	CurrentSeason       string    `xml:"currentSeason"`
	UniqueIDForThisGame int       `xml:"uniqueIDForThisGame"`
}

type Player struct {
	Name              string   `xml:"name"`
	HouseUpgradeLevel int      `xml:"houseUpgradeLevel"`
	MailReceived      []string `xml:"mailReceived>string"`
	FarmName          string   `xml:"farmName"`
	Money             int      `xml:"money"`
}

type Locations struct {
	GameLocations []GameLocation `xml:"GameLocation"`
	XML           string         `xml:",innerxml"`
}

type GameLocation struct {
	Name            string          `xml:"name"`
	Objects         Objects         `xml:"objects"`
	TerrainFeatures TerrainFeatures `xml:"terrainFeatures"`
	XML             string          `xml:",innerxml"`

	Buildings []Building `xml:"buildings>Building"`
}

type Building struct {
	Type string `xml:"type,attr"`

	TileX        int    `xml:"tileX"`
	TileY        int    `xml:"tileY"`
	TilesHigh    int    `xml:"tilesHigh"`
	BuildingType string `xml:"buildingType"`
	AnimalDoor   Vector `xml:"animalDoor"`
	HumanDoor    Vector `xml:"humanDoor"`
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
	Type        string `xml:"type,attr"`
	GrowthStage int    `xml:"growthStage"`

	TreeType int  `xml:"treeType"`
	Flipped  bool `xml:"flipped"`

	GrassType     int `xml:"grassType"`
	NumberOfWeeds int `xml:"numberOfWeeds"`

	WhichFloor int `xml:"whichFloor"`

	State int  `xml:"state"`
	Crop  Crop `xml:"crop"`
	// Always 0 in the save game.
	// GrassSourceOffset int `xml:"grassSourceOffset"`
}

type Crop struct {
	RowInSpriteSheet   int   `xml:"rowInSpriteSheet"`
	IndexOfHarvest     int   `xml:"indexOfHarvest"`
	CurrentPhase       int   `xml:"currentPhase"`
	Flip               bool  `xml:"flip"`
	FullyGrown         bool  `xml:"fullyGrown"`
	DaysOfCurrentPhase int   `xml:"dayOfCurrentPhase"`
	RaisedSeeds        bool  `xml:"raisedSeeds"`
	PhaseDays          []int `xml:"phaseDays>int"`
}

type ItemValue struct {
	Object Object
}

type Object struct {
	Name string `xml:"name"`
	Type string `xml:"type"`

	TileLocation     Vector  `xml:"tileLocation"`
	ParentSheetIndex int     `xml:"parentSheetIndex"`
	Health           float32 `xml:"health"`
	BigCraftable     bool    `xml:"bigCraftable"`

	XSIType   string `xml:"type,attr"` // the xsi:type is used by e.g: Fences
	WhichType int    `xml:"whichType"` // used by Fences

	XML string `xml:",innerxml"`
}

type ItemKey struct {
	Vector2 Vector
}

type Vector struct {
	X int
	Y int
}

func ParseSaveGame(r io.Reader) (saveGame *SaveGame, err error) {

	dec := xml.NewDecoder(r)
	v := Document{}
	if err := dec.Decode(&v); err != nil {
		return nil, fmt.Errorf("error: %v", err)
	}

	return &v.SaveGame, nil
}
