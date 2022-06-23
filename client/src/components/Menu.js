/* third party */
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<div className='card'>
			<ul className='list-group list-group-flush'>
				<li className='list-group-item'>
					<Link to='/'>Home</Link>
				</li>
				<li className='list-group-item'>
					<Link to='/movies'>Movies</Link>
				</li>
				<li className='list-group-item'>
					<Link to='/genres'>Genres</Link>
				</li>
				<li className='list-group-item'>
					<Link to='/admin'>Admin</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
