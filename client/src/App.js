/* third party */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* internal source */
import Menu from './components/Menu';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Genres from './pages/Genres';
import Admin from './pages/Admin';

/* style */
import './App.css';

function App() {
	return (
		<Router>
			<div className='container'>
				<div className='row'>
					<h1 className='mt-3'>Go react Movie Project!</h1>
					<hr className='mb-3' />
				</div>
				<div className='row'>
					<div className='col-sm-2 mb-3'>
						<Menu />
					</div>
					<div className='col-sm-10'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/movies' element={<Movies />} />
							<Route path='/genres' element={<Genres />} />
							<Route path='/admin' element={<Admin />} />
						</Routes>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
