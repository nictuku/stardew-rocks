package main

import (
	"fmt"
	_ "log"
	"os"
	"path/filepath"
	"strings"

	"golang.org/x/sys/windows/registry"
)

const (
	runKey     = `Software\Microsoft\Windows\CurrentVersion\Run`
	runKeyName = `stardew.rocks`
)

func exePath() (string, error) {
	prog := os.Args[0]
	p, err := filepath.Abs(prog)
	if err != nil {
		return "", err
	}
	fi, err := os.Stat(p)
	if err == nil {
		if !fi.Mode().IsDir() {
			return p, nil
		}
		err = fmt.Errorf("%s is directory", p)
	}
	if filepath.Ext(p) == "" {
		p += ".exe"
		fi, err := os.Stat(p)
		if err == nil {
			if !fi.Mode().IsDir() {
				return p, nil
			}
			err = fmt.Errorf("%s is directory", p)
		}
	}
	return "", err
}

func setupRunOnStartup() {
	exe, err := exePath()
	if err != nil {
		log.Fatalf("runOnStartup setup failure: %v", err)
		return
	}
	if !strings.HasSuffix(exe, "stardew_rocks.exe") {
		// Ignore the client.exe binary used for tests.
		return
	}
	regKey, err := registry.OpenKey(registry.CURRENT_USER, runKey, registry.SET_VALUE|registry.READ)
	if err != nil {
		log.Fatalf("runOnStartup open key failure: %v", err)
		return
	}
	defer regKey.Close()
	if got, gotType, err := regKey.GetStringValue(runKeyName); err == nil && gotType == registry.SZ && got == exe {
		log.Debugf("Startup: All set")
		return
	}
	if err != nil && err != registry.ErrNotExist {
		log.Fatalf("runOnStartup open key failure: %v", err)
		return
	}

	if err := regKey.SetStringValue(runKeyName, exe); err != nil {
		log.Fatalf("runOnStartup set string failure: %v", err)
		return
	}
	log.Info("Configured to startup automatically")

	return
}
