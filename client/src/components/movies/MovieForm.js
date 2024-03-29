import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { register, handleSubmit, setValue } = useForm();
	const isAddMode = !id;
	const fields = [
		'id',
		'title',
		'description',
		'runtime',
		'release_date',
		'runtime',
		'rating',
		'mpaa_rating',
		'genres',
	];

	const fetchMovie = async (id) => {
		try {
			const result = await axios(`http://localhost:4000/movies/${id}`);
			result.data.movie.release_date = new Date(result.data.movie.release_date)
				.toISOString()
				.split('T')[0];
			fields.forEach((field) => setValue(field, result.data.movie[field]));
		} catch (err) {
			console.log(err.response.data);
		}
	};

	useEffect(() => {
		if (!isAddMode) {
			fetchMovie(id);
		}
	}, [isAddMode]);

	const onSubmit = async (data) => {
		let dataJSON = JSON.stringify(data, (k, v) =>
			v && typeof v === 'object' ? v : '' + v
		);
		let payload = JSON.parse(dataJSON);
		if (isAddMode) {
			const result = await axios.post(
				'http://localhost:4000/admin/movies/add',
				JSON.stringify(payload)
			);
			console.log(result.data);
		} else {
			const result = await axios.post(
				'http://localhost:4000/admin/movies/edit',
				JSON.stringify(payload)
			);
			console.log(result.data);
		}
		// resetForm();
		navigate('/admin');
	};
	return (
		<>
			<h2>Movie Form</h2>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						id='title'
						name='title'
						{...register('title', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Release Date
					</label>
					<input
						type='date'
						className='form-control'
						id='release_date'
						name='release_date'
						{...register('release_date', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Runtime
					</label>
					<input
						type='number'
						className='form-control'
						id='runtime'
						name='runtime'
						{...register('runtime', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						MPAA Rating
					</label>
					<select
						name='mpaa_rating'
						id='mpaa_rating'
						className='form-control'
						{...register('mpaa_rating', { required: true })}
					>
						<option value='G' className='form-select'>
							G
						</option>
						<option value='PG' className='form-select'>
							PG
						</option>
						<option value='PG13' className='form-select'>
							PG13
						</option>
						<option value='R' className='form-select'>
							R
						</option>
						<option value='NC17' className='form-select'>
							NC17
						</option>
					</select>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Rating
					</label>
					<input
						type='number'
						className='form-control'
						id='rating'
						name='rating'
						{...register('rating', { required: true })}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Description
					</label>
					<textarea
						rows={3}
						className='form-control'
						id='description'
						name='description'
						{...register('description', { required: true })}
					/>
				</div>
				<hr />
				<button className='btn btn-primary mb-4' type='submit'>
					Save
				</button>
			</form>
		</>
	);
};

export default MovieForm;
