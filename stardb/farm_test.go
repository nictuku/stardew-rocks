package stardb

import (
	"testing"
)

func TestSearch(t *testing.T) {
	farms, err := SearchFarmsJSON("farm")
	if err != nil {
		t.Fatalf("SearchFarms err: %v", err)
	}
	if len(farms) == 0 {
		t.Fatalf("no farms :-(")
	}
	t.Logf("Found %d farms", len(farms))
}
