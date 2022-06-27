package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) writeJSON(rw http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})

	wrapper[wrap] = data

	res, err := json.Marshal(wrapper)
	if err != nil {
		app.logger.Println(err)
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	rw.Write(res)

	return nil
}

func (app *application) errorJSON(rw http.ResponseWriter, err error) {
	type jsonError struct {
		Message string `json:"message"`
	}

	errMessage := jsonError{
		Message: err.Error(),
	}

	app.writeJSON(rw, http.StatusBadRequest, errMessage, "error")
}
