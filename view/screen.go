package view

import (
	"image"
	"image/draw"
)

// screenshot represents a screenshot to be drawn for a save game.
type screenshot struct {
	sb  *SpriteBatch
	img draw.Image
}

func newScreenshot(img draw.Image) *screenshot {
	s := &screenshot{
		sb:  &SpriteBatch{},
		img: img,
	}
	s.sb.Start()
	return s
}

func (s *screenshot) Flush() {
	s.sb.Flush()
}

func (s *screenshot) Draw(r image.Rectangle, src image.Image, sp image.Point, layer float32) {
	s.sb.Draw(s.img, r, src, sp, layer)
}
