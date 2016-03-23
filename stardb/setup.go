package stardb

import "labix.org/v2/mgo"

var (
	Session        *mgo.Session
	DB             *mgo.Database
	FarmCollection *mgo.Collection
	GFS            *mgo.GridFS
)

func init() {
	var err error
	Session, err = mgo.Dial(mongoAddr)
	if err != nil {
		panic(err)
	}
	// Not relevant or possible.
	// Session.Close()

	DB = Session.DB("stardew")
	FarmCollection = DB.C("farms")
	GFS = DB.GridFS("sdr")

	//mgo.SetLogger(log.New(os.Stderr, "", log.LstdFlags))
	//mgo.SetDebug(true)

}
