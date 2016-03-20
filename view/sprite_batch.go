package view

import (
	"image"
	"image/draw"
)

type SpriteBatch struct {
	batch []drawSprite
}

type drawSprite struct {
	f     func()
	layer float32
}

func (s *SpriteBatch) Start() {
	s.batch = s.batch[:0] // reslice. Avoids re-allocating but also keeps the underlying data around.
}

func (s *SpriteBatch) DrawMask(dst draw.Image, r image.Rectangle, src image.Image, sp image.Point, mask image.Image, mp image.Point, op draw.Op, layer float32) {
	s.batch = append(s.batch, drawSprite{
		layer: layer,
		f: func() {
			draw.DrawMask(dst, r, src, sp, mask, mp, op)
		},
	})
}

func (s *SpriteBatch) Flush() {
	// TODO: sort
	for _, sprite := range s.batch {
		sprite.f()
	}
}
