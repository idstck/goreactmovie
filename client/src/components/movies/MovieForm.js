import React from 'react';

const MovieForm = () => {
	return (
		<>
			<h2>Movie Form</h2>
			<hr />
			<form>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						Title
					</label>
					<input type='text' className='form-control' id='title' name='title' />
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
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='' className='form-label'>
						MPAA Rating
					</label>
					<select name='mpaa_rating' id='mpaa_rating' className='form-control'>
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
					/>
				</div>
				<hr />
				<button className='btn btn-primary mb-4'>Save</button>
			</form>
		</>
	);
};

export default MovieForm;
