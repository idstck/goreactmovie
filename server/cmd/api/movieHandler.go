package main

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(rw http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		// app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(rw, err)
		return
	}

	// app.logger.Println("the id is: ", id)

	movie, err := app.models.DB.Get(id)

	err = app.writeJSON(rw, http.StatusOK, movie, "movie")
}
