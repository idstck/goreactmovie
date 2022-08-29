/* third party */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieTable = () => {
	const [movies, setMovies] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const confirmDelete = async (id) => {
		const payload = {
			id: id.toString(),
		};
		await axios.post(
			'http://localhost:4000/admin/movies/delete',
			JSON.stringify(payload)
		);
		fetchMovies();
	};

	const fetchMovies = async () => {
		try {
			const result = await axios(`http://localhost:4000/movies`);
			if (result.data.movies !== null) {
				await setMovies(result.data.movies);
				setLoaded(true);
			} else {
				setErrorMessage('nothing data to load');
			}
		} catch (err) {
			setErrorMessage(err.response.data);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<>
			<div className='row'>
				<div className='col-12'>
					<Link to={'/admin/movies/create'} className='btn btn-sm btn-primary'>
						Add
					</Link>
				</div>
			</div>
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
				<>
					<div className='row'>
						<div className='col-12'>
							<table className='table'>
								<thead>
									<tr>
										<td>No</td>
										<td>Name</td>
										<td></td>
									</tr>
								</thead>
								<tbody>
									{movies.map((movie, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>
												<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
											</td>
											<td>
												<div className='btn-group'>
													<button
														className='btn btn-secondary btn-sm dropdown-toggle'
														type='button'
														data-bs-toggle='dropdown'
														aria-expanded='false'
													>
														Action
													</button>
													<ul className='dropdown-menu'>
														<li>
															<span className='dropdown-item'>
																<Link to={`/admin/movies/${movie.id}/edit`}>
																	Edit
																</Link>
															</span>
														</li>
														<li>
															<span
																className='dropdown-item'
																style={{ cursor: 'pointer' }}
																onClick={() => {
																	if (window.confirm('Are you sure?')) {
																		confirmDelete(movie.id);
																	}
																}}
															>
																Delete
															</span>
														</li>
													</ul>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default MovieTable;
