package stardb

import (
	"log"
	"os"
	"strings"

	"gopkg.in/mgo.v2"
)

var (
	initialSession *mgo.Session
)

type CollectionsHolder struct {
	Farm *mgo.Collection
	// Farmhistory is updated more often and has extended information about the farm.
	// It has one entry for each save game of that farm.
	FarmHistory *mgo.Collection
	Files       *mgo.Collection
	GFS         *mgo.GridFS
}

func Collections() (col *CollectionsHolder, close func()) {
	session := initialSession.Clone()
	db := session.DB(dbName())
	return &CollectionsHolder{
		db.C("farms"),
		db.C("farmhistory"),
		db.C("sdr.files"),
		db.GridFS("sdr"),
	}, session.Close
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
	db := initialSession.DB(dbName())

	cols, closer := Collections()
	defer closer()
	if err := cols.Farm.EnsureIndexKey("name", "farmer"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := cols.Farm.EnsureIndexKey("-likes"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := cols.Farm.EnsureIndexKey("-lastupdate"); err != nil {
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
	if err := cols.FarmHistory.EnsureIndexKey("farmid", "ts"); err != nil {
		log.Printf("Failed to create a FarmHistoryCollection index: %v", err)
		os.Exit(1)
	}

	//mgo.SetLogger(log.New(os.Stderr, "", log.LstdFlags))
	//mgo.SetDebug(true)
}
