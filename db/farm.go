package db

import "time"

type Farm struct {
	Id         string
	Name       string
	Farmer     string
	Likes      int
	LastUpdate time.Time
	Thumbnail  string
}
