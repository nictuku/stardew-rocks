// This program watches for recently changed stardew save files and publishes them to the
// Stardew Rocks AMQP server.
package main

import (
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"

	"path/filepath"

	"github.com/fsnotify/fsnotify"
	"github.com/marcsauter/single"
	"github.com/streadway/amqp"
)

func stardewFolder() string {
	return path.Join(os.Getenv("AppData"), "StardewValley/Saves")
}

func allSaveGameInfos() ([]string, error) {
	return filepath.Glob(stardewFolder() + "/*/SaveGameInfo")
}

func isDir(path string) bool {
	fileInfo, err := os.Stat(path)
	if err != nil {
		return false
	}
	return fileInfo.IsDir()
}

func watchAndPublish(topic *amqp.Channel) {

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	gameSaves, err := allSaveGameInfos()
	if err != nil {
		log.Fatal(err)
	}

	// Find new folders containing new saved games.
	err = watcher.Add(stardewFolder())
	if err != nil {
		log.Fatal(err)
	}

	watched := map[string]bool{}

	for _, save := range gameSaves {
		err = watcher.Add(save)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("Watching %v", save)
		watched[save] = true
	}

	done := make(chan bool)
	go func() {
		for {
			select {
			case event := <-watcher.Events:
				if event.Op&fsnotify.Write == fsnotify.Write {
					log.Println("Found modified file:", event.Name)
					switch {
					case isDir(event.Name):
						if !watched[event.Name] {
							watcher.Add(event.Name)
							watched[event.Name] = true
						}
						// The game is saved in a temporary file first (Directory/SaveGameInfo_STARDEWVALLEYTMP)
					case strings.Contains(path.Base(event.Name), "SaveGameInfo"):
						content, err := ioutil.ReadFile(event.Name)
						if err != nil {
							log.Printf("Could not read file %v: %v", event.Name, err)
							continue
						}
						if err := publishSavedGame(topic, content); err != nil {
							log.Print("could not publish new save game content:", err)
							continue
						}
						log.Print("New save game published")
					}
				}
			case err := <-watcher.Errors:
				log.Println("error:", err)
			}
		}
	}()
	<-done
}

func main() {

	s := single.New("stardew-rocks-client") // Will exit if already running.
	s.Lock()
	defer s.Unlock()

	topic, close, err := rabbitStart()
	if err != nil {
		log.Fatal(err)
	}
	defer close()

	watchAndPublish(topic)
}
