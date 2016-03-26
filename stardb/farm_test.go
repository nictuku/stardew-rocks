package stardb

import (
	"strings"
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

func TestAllFarms(t *testing.T) {
	count := 0
	c := AllFarms("k")
	for farm := range c {
		if !strings.Contains(farm.Farmer, "k") {
			t.Errorf("Got unexpected farm that does not match the farmer name search criteria 'k': %v", farm.Farmer)
		}
		count++
	}
	if count < 1 {
		t.Errorf("Expected more farms, got %d", count)
	}
}
