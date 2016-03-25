package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/streadway/amqp"
)

func rabbitStart() (ch *amqp.Channel, close func(), err error) {
	conn, err := amqp.Dial("amqp://guest:guest@amqp.stardew.rocks:5672/")
	if err != nil {
		return nil, nil, fmt.Errorf("Failed to connect to AMQP server: %v", err)
	}

	if ch, err = conn.Channel(); err != nil {
		return nil, nil, err
	}
	log.Infof("Connected to the stardew.rocks amqp server")
	return ch, func() {
		conn.Close()
		ch.Close()
	}, nil

}

func publishOtherFiles(ch *amqp.Channel, fileName string) error {
	content, err := ioutil.ReadFile(fileName)
	if err != nil {
		return fmt.Errorf("Could not read file %v: %v", fileName, err)
	}

	return ch.Publish(
		"OtherFiles-1", // exchange
		"",             // routing key
		false,          // mandatory
		false,          // immediate
		amqp.Publishing{
			ContentType:     "application/xml",
			ContentEncoding: "gzip",
			Body:            content,
		})

}

// readAll reads the XML file, compresses and returns it as a slice of bytes.
func readAll(fileName string) ([]byte, error) {
	f, err := os.Open(fileName)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	buf := bytes.NewBuffer(nil)
	w := gzip.NewWriter(buf)
	if _, err := io.Copy(w, f); err != nil {
		return nil, err
	}
	w.Close()
	return buf.Bytes(), nil
}

func publishSavedGame(ch *amqp.Channel, fileName string) error {

	content, err := readAll(fileName)
	if err != nil {
		return fmt.Errorf("Could not read file %v: %v", fileName, err)
	}
	if len(content) == 0 {
		// Recently created file
		return fmt.Errorf("zero-length file")
	}

	return ch.Publish(
		"SaveGameInfo-1", // exchange
		"",               // routing key
		false,            // mandatory
		false,            // immediate
		amqp.Publishing{
			ContentType:     "application/xml",
			ContentEncoding: "gzip",
			Body:            content,
		})

}
