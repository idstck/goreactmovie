package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
}

type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
	Version     string `json:"version"`
}

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on ")
	flag.StringVar(&cfg.env, "env", "development", "Application environment (development|production)")
	flag.Parse()

	fmt.Println("Server is running...")

	http.HandleFunc("/status", func(rw http.ResponseWriter, r *http.Request) {
		currentStatus := AppStatus{
			Status:      "Online",
			Environment: cfg.env,
			Version:     version,
		}

		res, err := json.MarshalIndent(currentStatus, "", "\t")
		if err != nil {
			fmt.Println(err)
		}

		rw.Header().Set("Content-Type", "application/json")
		rw.WriteHeader(http.StatusOK)
		rw.Write(res)
	})

	err := http.ListenAndServe(fmt.Sprintf(":%d", cfg.port), nil)
	if err != nil {
		log.Println(err)
	}
}
