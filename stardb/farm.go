package stardb

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"path"
	"time"

	"gopkg.in/mgo.v2"

	"gopkg.in/mgo.v2/bson"
)

type Farm struct {

	// Fields with  `json:"-"` are ommited for web display

	ID        bson.ObjectId `bson:"_id,omitempty" json:"-"`
	UniqueID  int           `json:"-"`
	Name      string
	Farmer    string
	Likes     int
	SaveTime  time.Time `json:"-"`
	Thumbnail string
}

func (f *Farm) ScreenshotPath() string {
	return fmt.Sprintf("/screenshot/%v/%d.xml", f.ID.Hex(), f.SaveTime.Unix())
}

func FarmsJSON() ([]byte, error) {
	var result []*Farm

	if err := FarmCollection.Find(nil).Limit(20).All(&result); err != nil {
		return nil, err
	}
	for _, farm := range result {
		farm.Thumbnail = farm.ScreenshotPath()
	}
	return json.Marshal(result)
}

func UpdateFarmTime(c *mgo.Collection, id bson.ObjectId, ts time.Time) error {
	return c.Update(bson.M{"_id": id}, bson.M{"savetime": ts})
}

func FindFarm(c *mgo.Collection, uniqueIDForThisGame int, playerName, farmName string) (ret *Farm, existing bool, err error) {
	ret = &Farm{}
	q := c.Find(bson.M{
		"name":     farmName,
		"farmer":   playerName,
		"uniqueid": uniqueIDForThisGame,
	})
	if err := q.One(&ret); err != nil {
		log.Println("not found", err)

		farm := &Farm{
			Name:     farmName,
			Farmer:   playerName,
			UniqueID: uniqueIDForThisGame,
			ID:       bson.NewObjectId(),
			SaveTime: time.Now(),
		}
		if err := c.Insert(farm); err != nil {
			log.Println("could not insert", err)
			return nil, false, err
		}
		log.Println("insert ok", farm.ID.String())
		return farm, false, nil
	}
	log.Printf("found ok %v, %v, %v", ret.Name, ret.Farmer, ret.SaveTime)

	return ret, true, nil
}

func WriteSaveFile(farm *Farm, body []byte, ts time.Time) error {
	if farm.SaveTime.IsZero() {
		return fmt.Errorf("error writing save file: unexpected zero save time")
	}

	saveFile := path.Join("saveGames", farm.ScreenshotPath())
	g, err := GFS.Create(saveFile)
	if err != nil {
		return fmt.Errorf("Error opening grid saveGames %v: %v", saveFile, err)

	}
	g.SetUploadDate(ts)
	defer g.Close()
	if _, err := g.Write(body); err != nil {
		return fmt.Errorf("Failed to write grid save file at %v: %v", saveFile, err)
	}

	log.Printf("Wrote grid saveGame file %v", saveFile)
	return nil
}

// NewScreenshotWriter saves a screenshot in GFS at screenshots/<hexid>.png
func NewScreenshotWriter(farm *Farm, ts time.Time) (io.WriteCloser, error) {
	if farm.SaveTime.IsZero() {
		return nil, fmt.Errorf("error writing screenshot: unexpected zero save time")
	}
	g, err := GFS.Create(farm.ScreenshotPath())
	if err != nil {
		return nil, err
	}
	g.SetUploadDate(ts)
	return g, nil
}
