import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MovieForm = () => {
	const { register, handleSubmit, setValue } = useForm();
	const onSubmit = async (data) => {
		const result = await axios.post(
			'http://localhost:4000/admin/movies/add',
			JSON.stringify(data)
		);
		console.log(result.data);
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
