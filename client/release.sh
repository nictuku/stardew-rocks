#!/bin/sh

# x86 can also run in 64-bit computers, so this is more convenient.
# The windowsgui option prevents opening a console for it.
GOARCH=amd64 go build -ldflags -H=windowsgui -o stardew_rocks.exe
