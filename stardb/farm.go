package stardb

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"time"

	"gopkg.in/mgo.v2"

	"gopkg.in/mgo.v2/bson"
)

type Farm struct {

	// Fields with  `json:"-"` are ommited for web display

	InternalID bson.ObjectId `bson:"_id,omitempty" json:"-"`
	ID         string        // Like InternalID, but in hex format. This can be exposed on the web.
	UniqueID   int           `json:"-"`
	Name       string
	Farmer     string
	Likes      int
	// TODO: stop omitting this once the web client understands it.
	LastUpdate time.Time `json:"-"`
	Thumbnail  string
	History    []int
	Money      int
}

func (f *Farm) ScreenshotPath() string {
	return f.ScreenshotPathByTime(int(f.LastUpdate.Unix()))
}

func (f *Farm) ScreenshotPathByTime(ts int) string {
	return fmt.Sprintf("/screenshot/%v/%d.png", f.InternalID.Hex(), ts)
}

func (f *Farm) AnimatedHistoryPath() string {
	return fmt.Sprintf("/history/%v.gifv", f.InternalID.Hex())
}

func (f *Farm) saveGamePath() string {
	return SaveGamePath(f.InternalID.Hex(), f.LastUpdate)
}

func saveGameToSaveTime(s string) (int, error) {
	// input: /saveGames/56f34dd6f48e3e520cea687b/1458795576.xml
	// output: 1458795576
	base := filepath.Base(s)
	noExt := strings.TrimSuffix(base, filepath.Ext(base))
	return strconv.Atoi(noExt)
}

// SaveTimes returns the sorted timestamps for which a certain farm has had save games.
// The save times are obtained from the save file XML filenames.
func (f *Farm) SaveTimes() []int {
	// TODO: Use a metadata field instead in case this proves to be too slow.
	var filenames []struct {
		FileName string `bson:"filename"`
	}
	var saveTimes []int

	prefix := fmt.Sprintf("^/saveGames/%v", f.InternalID.Hex())
	if err := DB.C("sdr.files").Find(bson.M{
		"filename": bson.M{"$regex": prefix}}).Sort("filename").Select(bson.M{"filename": 1}).All(&filenames); err != nil {
		log.Printf("SaveTimes error: %v", err)
		return nil
	}
	saveTimes = make([]int, 0, len(filenames))

	for _, k := range filenames {
		tt, err := saveGameToSaveTime(k.FileName)
		if err != nil {
			log.Printf("convering savegame to time format %v", err)
			return nil
		}
		saveTimes = append(saveTimes, tt)
	}
	sort.Ints(saveTimes)
	return saveTimes
}

func SaveGamePathInt(id string, ts int) string {
	return fmt.Sprintf("/saveGames/%v/%d.xml", id, ts)
}

func SaveGamePath(id string, ts time.Time) string {
	return SaveGamePathInt(id, int(ts.Unix()))
}

// AllFarms iterates over all farms and sends them over c until it's done, then it closes the
// channel.  There is no cancellation here so the caller *must* read everything from c until it's
// closed, otherwise the goroutine will leak out.
// Future implementations should consider allowing the client to abort the reads properly.
func AllFarms(farmerRE string) (c chan *Farm) {
	c = make(chan *Farm)

	go func() {
		defer close(c)

		iter := FarmCollection.Find(bson.M{"farmer": bson.M{"$regex": farmerRE}}).Sort("-lastupdate").Iter()

		for {
			var next *Farm // Need a separate point for every farm.
			if ok := iter.Next(&next); !ok {
				break
			}
			c <- next
		}

		if err := iter.Close(); err != nil {
			log.Printf("AllFarm warning, may have returned partial results: %v", iter.Err())
		}
	}()
	return c
}

func FarmsJSON() ([]byte, error) {
	var farms []*Farm
	// TODO: implement paging on the server side instead of returning a very large result.
	if err := FarmCollection.Find(nil).Sort("-lastupdate").Limit(500).All(&farms); err != nil {
		return nil, err
	}
	for _, farm := range farms {
		farm.Thumbnail = farm.ScreenshotPath()
		farm.ID = farm.InternalID.Hex()
	}
	return json.Marshal(farms)
}

func FarmJSON(id string) ([]byte, error) {
	if !bson.IsObjectIdHex(id) {
		return nil, fmt.Errorf("invalid farm id")
	}
	var farm *Farm
	if err := FarmCollection.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&farm); err != nil {
		return nil, err
	}
	farm.Thumbnail = farm.ScreenshotPath()
	farm.ID = farm.InternalID.Hex()
	// Note: This is probably a bit slow in the current implementation.
	farm.History = farm.SaveTimes()

	return json.Marshal(farm)
}

func LegacyMap(farmer string) (*Farm, error) {
	var farm *Farm
	if err := FarmCollection.Find(bson.M{"farmer": farmer}).One(&farm); err != nil {
		return nil, fmt.Errorf("error finding farm: %v", err)
	}
	farm.ID = farm.InternalID.Hex()
	return farm, nil
}

func SearchFarmsJSON(query string) ([]byte, error) {
	var farms []*Farm
	re := bson.RegEx{query, "i"}
	if err := FarmCollection.Find(
		bson.M{"$or": []interface{}{
			bson.M{"name": bson.M{"$regex": re}},
			bson.M{"farmer": bson.M{"$regex": re}},
		}}).Sort("-lastupdate").Limit(20).All(&farms); err != nil {
		return nil, err

	}
	for _, farm := range farms {
		farm.Thumbnail = farm.ScreenshotPath()
		farm.ID = farm.InternalID.Hex()
		// We don't populate the farm's history here because it's too slow and
		// that information is not really necessary at this stage.
	}
	return json.Marshal(farms)
}

func UpdateFarmTime(id bson.ObjectId, ts time.Time) error {
	return FarmCollection.Update(bson.M{"_id": id}, bson.M{"$set": bson.M{"lastupdate": ts}})
}

func FindOrCreateFarm(c *mgo.Collection, uniqueIDForThisGame int, playerName, farmName string) (ret *Farm, existing bool, err error) {
	ret = &Farm{}
	q := c.Find(bson.M{
		"name":     farmName,
		"farmer":   playerName,
		"uniqueid": uniqueIDForThisGame,
	})
	if err := q.One(&ret); err != nil {
		log.Println("not found", err)

		farm := &Farm{
			Name:       farmName,
			Farmer:     playerName,
			UniqueID:   uniqueIDForThisGame,
			InternalID: bson.NewObjectId(),
			LastUpdate: time.Now(),
		}
		if err := c.Insert(farm); err != nil {
			log.Println("could not insert", err)
			return nil, false, err
		}
		log.Println("insert ok", farm.InternalID.String())
		return farm, false, nil
	}
	log.Printf("found ok %v, %v, %v", ret.Name, ret.Farmer, ret.LastUpdate)

	return ret, true, nil
}

func WriteSaveFile(farm *Farm, body []byte, ts time.Time) error {
	farm.LastUpdate = ts
	saveFile := farm.saveGamePath()
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
	if farm.LastUpdate.IsZero() {
		return nil, fmt.Errorf("error writing screenshot: unexpected zero save time")
	}
	g, err := GFS.Create(farm.ScreenshotPath())
	if err != nil {
		return nil, err
	}
	g.SetUploadDate(ts)
	return g, nil
}
