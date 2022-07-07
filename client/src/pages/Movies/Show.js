import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../../components/movies/MovieDetail';

const ShowMovie = () => {
	let { id } = useParams();
	const [movie, setMovie] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const result = await axios(`http://localhost:4000/movies/${id}`);
				await setMovie(result.data.movie);
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
				<MovieDetail movie={movie} />
			)}
		</>
	);
};

export default ShowMovie;
