/* third party */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const result = await axios(`http://localhost:4000/movies`);
				await setMovies(result.data.movies);
				setLoaded(true);
			} catch (err) {
				setErrorMessage(err.response.data);
			}
		};
		fetchMovies();
	}, []);

	return (
		<>
			{!loaded ? (
				(() => {
					if (errorMessage) {
						return (
							<div className='row'>
								<p>Oops... {errorMessage}</p>
							</div>
						);
					} else {
						return (
							<div className='row'>
								<p>Loading...</p>
							</div>
						);
					}
				})()
			) : (
				<div className='row'>
					{movies.map((movie, index) => (
						<div className='col-sm-4 mb-2' key={index}>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>{movie.title}</h5>
									<p className='card-text'>
										With supporting text below as a natural lead-in to
										additional content.
									</p>
									<Link to={`/movies/${movie.id}`} className='btn btn-primary'>
										Read more
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default MovieList;
