package main

import (
	"net/http"
	"server/models"
	"strconv"
	"time"

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

	movie := models.Movie{
		ID:          id,
		Title:       "some movie title",
		Description: "some description movie",
		Year:        2022,
		ReleaseDate: time.Date(1990, 01, 01, 01, 0, 0, 0, time.Local),
		Runtime:     112,
		Rating:      5,
		MPAARating:  "PG-13",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	err = app.writeJSON(rw, http.StatusOK, movie, "movie")
}
