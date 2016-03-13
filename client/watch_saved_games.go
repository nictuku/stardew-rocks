// This program watches for recently changed stardew save files and publishes them to the
// Stardew Rocks AMQP server.
package main

import (
	"log"
	"os"
	"path"
	"strings"

	"path/filepath"

	"github.com/fsnotify/fsnotify"
	"github.com/marcsauter/single"
	"github.com/streadway/amqp"
)

const (
	verbose = false
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

func relPath(p string) string {
	rel, err := filepath.Rel(stardewFolder(), p)
	if err != nil {
		log.Fatal(err)
	}
	return rel
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
		log.Printf("Watching %v", relPath(save))
		watched[save] = true
	}

	done := make(chan bool)
	go func() {
		for {
			select {
			// The game is saved in a temporary file first (Directory/SaveGameInfo_STARDEWVALLEYTMP).
			// If the write works, it renames it to replace the older file.
			// Our job here is to watch for new files being created and written to, and stop watching the ones that get deleted.
			//
			// Sometimes game crashes happen if we get things wrong. My theory is that happens if we don't stop
			// watching the files and then they get written to again - or so.
			// If that's true, then this is all very racy :-(. If the game manages to open the new file before we
			// remove the file watch, a crash may happen.

			case event := <-watcher.Events:
				switch {
				case event.Op&fsnotify.Remove == fsnotify.Remove:
					watcher.Remove(event.Name)
					delete(watched, event.Name)
					if verbose {
						log.Println("Deleted file watch:", relPath(event.Name))
					}
				case event.Op&fsnotify.Write == fsnotify.Write:
					if verbose {
						log.Println("Found modified file:", relPath(event.Name))
					}
					switch {
					case isDir(event.Name):
						if !watched[event.Name] {
							watcher.Add(event.Name)
							watched[event.Name] = true
							log.Printf("Watching folder %v", relPath(event.Name))
						}
					case strings.Contains(path.Base(event.Name), "SaveGameInfo"):

						if err := publishSavedGame(topic, event.Name); err != nil {
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
