package main

import (
	"log"

	"github.com/streadway/amqp"
)

func rabbitStart() (ch *amqp.Channel, close func(), err error) {
	conn, err := amqp.Dial("amqp://guest:guest@amqp.stardew.rocks:5672/")
	log.Fatalf("Failed to connect to AMQP server: %v", err)

	if ch, err = conn.Channel(); err != nil {
		return nil, nil, err
	}

	return ch, func() {
		conn.Close()
		ch.Close()
	}, nil

}

func publishSavedGame(ch *amqp.Channel, save []byte) error {
	return ch.Publish(
		"logs", // exchange
		"",     // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        save,
		})

}
