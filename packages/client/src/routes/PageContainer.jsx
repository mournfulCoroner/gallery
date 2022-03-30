import { Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage/CategoryPage';
import Home from './Home/Home';
import Login from './Login/Login';
import './PageContainer.scss';

const PageContainer = () => {
	return (
		<div className="page-container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:id" element={<CategoryPage />} />
				<Route path="/login" element={<Login/>}/>
			</Routes>
		</div>
	);
};

export default PageContainer;
