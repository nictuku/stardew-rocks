package main

import (
	"testing"
)

func TestWidthPath(t *testing.T) {

	var tests = []struct {
		input     string
		wantPath  string
		wantWidth string
		wantBool  bool
	}{
		{
			"foo.png",
			"foo.png",
			"",
			false,
		},
		{
			"foow300.png",
			"foo.png",
			"300",
			true,
		},
	}
	for _, tt := range tests {
		p, w, ok := widthPath(tt.input)
		if p != tt.wantPath {
			t.Errorf("widthPath(%v) path wanted %v got %v", tt.input, tt.wantPath, p)
		}
		if w != tt.wantWidth {
			t.Errorf("widthPath(%v) width wanted %v got %v", tt.input, tt.wantWidth, w)
		}
		if ok != tt.wantBool {
			t.Errorf("widthPath(%v) bool wanted %v got %v", tt.input, tt.wantBool, ok)
		}

	}
}
