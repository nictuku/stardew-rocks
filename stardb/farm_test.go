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

func TestAllFarms(t *testing.T) {
	count := 0
	c := AllFarms()
	for farm := range c {
		t.Logf("AllFarms seen %v", farm.Name)
		count++
	}
	if count < 1 {
		t.Errorf("Expected more farms, got %d", count)
	}
}
