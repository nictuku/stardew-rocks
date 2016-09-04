package stardb

import (
	"log"
	"os"
	"strings"

	"gopkg.in/mgo.v2"
)

var (
	initialSession *mgo.Session

	// TODO: Move this to request-bound sessions.
	FarmHistoryCollection *mgo.Collection
	GFS                   *mgo.GridFS
)

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
	db := initialSession.DB(dbName())

	// farmhistory is updated more often and has extended information about the farm.
	// It has one entry for each save game of that farm.
	FarmHistoryCollection = db.C("farmhistory")

	GFS = db.GridFS("sdr")

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
	if err := db.C("sdr.files").EnsureIndexKey("filename"); err != nil {
		log.Printf("Failed to create a GFS filename index: %v", err)
		os.Exit(1)
	}
	// Used for dedupe queries.
	if err := db.C("sdr.files").EnsureIndexKey("md5"); err != nil {
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

func FarmCollection() (col *mgo.Collection, close func()) {
	session := initialSession.Clone()
	return session.DB(dbName()).C("farms"), session.Close
}

func Files() (col *mgo.Collection, closer func()) {
	session := initialSession.Clone()
	return session.DB(dbName()).C("sdr.files"), session.Close
}
