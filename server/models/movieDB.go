package models

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func (m *DBModel) Get(id int) (*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `SELECT 
				id, title, description, year, 
				release_date, runtime, rating, 
				mpaa_rating, created_at, updated_at 
			FROM 
				movies 
			WHERE id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)

	var movie Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Rating,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	query = `select
				mg.id, mg.movie_id, mg.genre_id, g.genre_name
			from
				movies_genres mg
				left join genres g on (g.id = mg.genre_id)
			where
				mg.movie_id = $1
	`

	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	genres := make(map[int]string)
	for rows.Next() {
		var mg MovieGenre
		err := rows.Scan(
			&mg.ID,
			&mg.MovieID,
			&mg.GenreID,
			&mg.Genre.GenreName,
		)
		if err != nil {
			return nil, err
		}
		genres[mg.GenreID] = mg.Genre.GenreName
	}

	movie.MovieGenre = genres

	return &movie, nil
}

func (m *DBModel) All(genre ...int) ([]*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	where := ""

	if len(genre) > 0 {
		where = fmt.Sprintf("WHERE id IN ( SELECT movie_id FROM movies_genres WHERE genre_id = %d)", genre[0])
	}

	query := fmt.Sprintf("SELECT id, title, description, year, release_date, runtime, rating, mpaa_rating, created_at, updated_at FROM movies %s ORDER BY title", where)

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*Movie

	for rows.Next() {
		var movie Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.Description,
			&movie.Year,
			&movie.ReleaseDate,
			&movie.Rating,
			&movie.Runtime,
			&movie.MPAARating,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genreQuery := `select
				mg.id, mg.movie_id, mg.genre_id, g.genre_name
			from
				movies_genres mg
				left join genres g on (g.id = mg.genre_id)
			where
				mg.movie_id = $1
		`

		genreRows, _ := m.DB.QueryContext(ctx, genreQuery, movie.ID)
		defer genreRows.Close()

		genres := make(map[int]string)
		for genreRows.Next() {
			var mg MovieGenre
			err := genreRows.Scan(
				&mg.ID,
				&mg.MovieID,
				&mg.GenreID,
				&mg.Genre.GenreName,
			)
			if err != nil {
				return nil, err
			}
			genres[mg.GenreID] = mg.Genre.GenreName
		}
		genreRows.Close()
		movie.MovieGenre = genres
		movies = append(movies, &movie)
	}
	return movies, nil
}

func (m *DBModel) GetGenreAll() ([]*Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `SELECT 
				id, genre_name, created_at, updated_at
			FROM 
				genres 
			ORDER BY 
				genre_name`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var genres []*Genre

	for rows.Next() {
		var genre Genre
		err := rows.Scan(
			&genre.ID,
			&genre.GenreName,
			&genre.CreatedAt,
			&genre.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	return genres, nil
}

func (m *DBModel) InsertMovie(movie Movie) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `INSERT INTO movies (title, description, year, release_date, runtime, rating, mpaa_rating, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

	_, err := m.DB.ExecContext(ctx, query,
		movie.Title,
		movie.Description,
		movie.Year,
		movie.ReleaseDate,
		movie.Runtime,
		movie.Rating,
		movie.MPAARating,
		movie.CreatedAt,
		movie.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) UpdateMovie(movie Movie) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `UPDATE movies set title = $1, description = $2, year = $3, release_date = $4, runtime = $5, rating = $6, mpaa_rating = $7, updated_at = $8 WHERE id = $9`

	_, err := m.DB.ExecContext(ctx, query,
		movie.Title,
		movie.Description,
		movie.Year,
		movie.ReleaseDate,
		movie.Runtime,
		movie.Rating,
		movie.MPAARating,
		movie.UpdatedAt,
		movie.ID,
	)

	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) DeleteMovie(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `DELETE FROM movies_genres WHERE movie_id = $1`

	_, err := m.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	query = `DELETE FROM movies WHERE id = $1`
	_, err = m.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	return nil
}
