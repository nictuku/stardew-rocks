package stardb

import (
	"log"
	"os"
	"strings"

	"gopkg.in/mgo.v2"
)

var (
	initialSession        *mgo.Session
	DB                    *mgo.Database // XXX Remove this
	FarmHistoryCollection *mgo.Collection
	GFS                   *mgo.GridFS
)

func FarmCollection() (col *mgo.Collection, close func()) {
	session := initialSession.Clone()
	return DB.C("farms"), session.Close
}

func dbName() string {
	// The last bit of the Dial string is the database.
	spl := strings.Split(mongoAddr, "/")
	return spl[len(spl)-1]
}

func init() {
	var err error
	initialSession, err = mgo.Dial(mongoAddr)
	if err != nil {
		log.Printf("Mongodb connection failure: %v", err)
		os.Exit(1)
	}
	// Not relevant or possible.
	DB = initialSession.DB(dbName())

	// farmhistory is updated more often and has extended information about the farm.
	// It has one entry for each save game of that farm.
	FarmHistoryCollection = DB.C("farmhistory")

	GFS = DB.GridFS("sdr")

	farmCollection, closer := FarmCollection()
	defer closer()
	if err := farmCollection.EnsureIndexKey("name", "farmer"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := farmCollection.EnsureIndexKey("-likes"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := farmCollection.EnsureIndexKey("-lastupdate"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := DB.C("sdr.files").EnsureIndexKey("filename"); err != nil {
		log.Printf("Failed to create a GFS filename index: %v", err)
		os.Exit(1)
	}
	// Used for dedupe queries.
	if err := DB.C("sdr.files").EnsureIndexKey("md5"); err != nil {
		log.Printf("Failed to create a GFS md5 index: %v", err)
		os.Exit(1)
	}
	if err := FarmHistoryCollection.EnsureIndexKey("farmid", "ts"); err != nil {
		log.Printf("Failed to create a FarmHistoryCollection index: %v", err)
		os.Exit(1)
	}

	//mgo.SetLogger(log.New(os.Stderr, "", log.LstdFlags))
	//mgo.SetDebug(true)
}
