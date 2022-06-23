/* third party */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		setMovies([
			{ id: 1, title: 'Spongebob Squarepants', runtime: 145 },
			{ id: 2, title: 'Ogry', runtime: 145 },
			{ id: 3, title: 'Chalk Zone', runtime: 145 },
		]);
	}, []);

	return (
		<div className='row'>
			{movies.map((movie, index) => (
				<div className='col-sm-4 mb-2' key={index}>
					<div className='card'>
						<div className='card-body'>
							<h5 className='card-title'>{movie.title}</h5>
							<p className='card-text'>
								With supporting text below as a natural lead-in to additional
								content.
							</p>
							<Link to={`/movies/${movie.id}`} className='btn btn-primary'>
								Read more
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;
