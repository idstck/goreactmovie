import React from 'react';
import { Link } from 'react-router-dom';

const MovieDetail = ({ movie }) => {
	return (
		<>
			<h2>
				Movie: {movie.title} ({movie.year}){' '}
			</h2>

			<div className='float-start'>
				<small>Rating: {movie.mpaa_rating}</small>
			</div>
			<div className='float-end'>
				{Object.entries(movie.genres).map((genre, index) => (
					<Link
						className='badge bg-secondary me-1'
						to={`/genres/${genre[0]}/movies`}
						key={index}
					>
						{genre[1]}
					</Link>
				))}
			</div>
			<div className='clearfix'></div>
			<hr />
			<table className='table table-dark table-striped table-sm-mt-4'>
				<thead></thead>
				<tbody>
					<tr>
						<td>Title: </td>
						<td>{movie.title}</td>
					</tr>
					<tr>
						<td>Description:</td>
						<td>{movie.description}</td>
					</tr>
					<tr>
						<td>Runtime:</td>
						<td>{movie.runtime} Minute(s)</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default React.memo(MovieDetail);
