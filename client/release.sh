#!/bin/sh

# x86 can also run in 64-bit computers, so ideally we should use that.
# Unfortunately, I temporarily lost the ability to build 32-bit binaries. 
# The trayhost library uses cgo, which makes it annoying.
# So we'll use amd64 temporarily for a bit.

# The windowsgui option avoids opening a console.
GOARCH=amd64 go build -ldflags -H=windowsgui -o stardew_rocks.exe
