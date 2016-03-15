package main

import (
	"image"
	"image/color"
	"image/draw"
	"image/png"
	"io"
	"strings"
)

const (
	dx, dy = 80, 80
)

var (
	plant = color.RGBA{0x3B, 0x92, 0x10, 255} // 3B9210
	weed  = color.RGBA{0x0F, 0x4D, 0x04, 255}
)

func Image(farmMap farmMap, w io.Writer) {

	dirt := &image.Uniform{color.RGBA{0xEE, 0xAC, 0x24, 0xFF}}
	m := image.NewNRGBA(image.Rect(0, 0, dx*10, dy*10))

	draw.Draw(m, m.Bounds(), dirt, image.ZP, draw.Src)

	for y := 0; y < dy; y++ {
		for x := 0; x < dx; x++ {
			var v *image.Uniform
			if strings.HasPrefix(farmMap.loc[y][x], "tree") {
				v = &image.Uniform{plant}
			} else if farmMap.loc[y][x] != "" {
				v = &image.Uniform{weed}
			} else {
				v = dirt
			}
			draw.Draw(m, image.Rect(x*10, y*10, x*10+10, y*10+10), v, image.ZP, draw.Src)
		}
	}

	if err := png.Encode(w, m); err != nil {
		panic(err)
	}

	//buf.WriteTo(f)
	//enc := base64.StdEncoding.EncodeToString(buf.Bytes())
	//fmt.Println("IMAGE:" + enc)

}

/*

	f, err := os.OpenFile("file.png", os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		panic(err)
	}
*/
