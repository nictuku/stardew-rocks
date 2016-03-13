// This program watches for recently changed stardew save files and publishes them to the
// Stardew Rocks AMQP server.
package main

import (
	"io/ioutil"
	"log"
	"os"
	"path"

	"path/filepath"

	"github.com/fsnotify/fsnotify"
)

func stardewFolder() string {
	return path.Join(os.Getenv("AppData"), "StardewValley/Saves")
}

func allSaveGameInfos() ([]string, error) {
	return filepath.Glob(stardewFolder() + "/*/SaveGameInfo")
}

func main() {

	ch, close, err := rabbitStart()
	if err != nil {
		log.Fatal(err)
	}
	defer close()

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	go func() {
		for {
			select {
			case event := <-watcher.Events:
				if event.Op&fsnotify.Write == fsnotify.Write {
					log.Println("modified file:", event.Name)
					content, err := ioutil.ReadFile(event.Name)
					if err != nil {
						log.Printf("could not read file %v: %v", event.Name, err)
						continue
					}
					if err := publishSavedGame(ch, content); err != nil {
						log.Print("could not publish new save game content:", err)
						continue
					}
					log.Print("New save game published")

				}
			case err := <-watcher.Errors:
				log.Println("error:", err)
			}
		}
	}()

	gameSaves, err := allSaveGameInfos()
	if err != nil {
		log.Fatal(err)
	}
	for _, save := range gameSaves {
		err = watcher.Add(save)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("Watching %v", save)
	}

	select {}

}
