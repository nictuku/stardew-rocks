package stardb

import (
	"strings"

	"gopkg.in/mgo.v2"
)

var (
	Session        *mgo.Session
	DB             *mgo.Database
	FarmCollection *mgo.Collection
	GFS            *mgo.GridFS
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
		panic(err)
	}
	// Not relevant or possible.
	// Session.Close()

	DB = Session.DB(dbName())
	FarmCollection = DB.C("farms")
	GFS = DB.GridFS("sdr")

	//mgo.SetLogger(log.New(os.Stderr, "", log.LstdFlags))
	//mgo.SetDebug(true)

}
