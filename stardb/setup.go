package stardb

import (
	"log"
	"os"
	"strings"

	"gopkg.in/mgo.v2"
)

var (
	Session               *mgo.Session
	DB                    *mgo.Database
	FarmCollection        *mgo.Collection
	FarmInfoCollection    *mgo.Collection
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
	Session, err = mgo.Dial(mongoAddr)
	if err != nil {
		log.Printf("Mongodb connection failure: %v", err)
		os.Exit(1)
	}
	// Not relevant or possible.
	// Session.Close()
	DB = Session.DB(dbName())
	FarmCollection = DB.C("farms")

	// farminfo is updated more often and has extended information about the farm.
	FarmInfoCollection = DB.C("farminfo")

	// FarmHistory is like farminfo but has one entry for each save game of that farm.
	FarmHistoryCollection = DB.C("farmhistory")

	GFS = DB.GridFS("sdr")

	if err := FarmCollection.EnsureIndexKey("name", "farmer"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := FarmCollection.EnsureIndexKey("-likes"); err != nil {
		log.Printf("Failed to create a FarmCollection index: %v", err)
		os.Exit(1)
	}
	if err := FarmCollection.EnsureIndexKey("-lastupdate"); err != nil {
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
