#!/bin/sh

# x86 can also run in 64-bit computers, so this is more convenient.
GOARCH=386 go build -o stardew_rocks.exe
