import React from 'react';
import { useParams } from 'react-router-dom';

const ShowMovie = () => {
	let { id } = useParams();
	return (
		<>
			<h2>Movie: {id} </h2>

			<div className='float-start'>
				<small>Rating:</small>
			</div>
			<div className='float-end'>
				<span className='badge bg-secondary me-1'>Action</span>
			</div>
			<div className='clearfix'></div>
			<hr />
			<table className='table table-dark table-striped table-sm-mt-4'>
				<thead></thead>
				<tbody>
					<tr>
						<td>Title:</td>
					</tr>
					<tr>
						<td>Description:</td>
					</tr>
					<tr>
						<td>Runtime:</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default ShowMovie;
