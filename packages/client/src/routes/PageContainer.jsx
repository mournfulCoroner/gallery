import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage/CategoryPage';
import EditPage from './Edit/EditPage';
import Home from './Home/Home';
import Login from './Login/Login';
import './PageContainer.scss';
import QuestionAdminPage from './QuestionAdminPage/QuestionAdminPage';
import QuestionForm from './QuestionForm/QuestionForm';

const PageContainer = () => {
	const user = useSelector((state) => state.reducerUser.user)
	return (
		<div className="page-container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category/:id" element={<CategoryPage />} />
				<Route path="/login" element={<Login/>}/>
				<Route path="/question" element={<QuestionAdminPage/>}/>
				<Route path="/admin" element={user.role === "Admin" ? <EditPage/> : <Navigate to="/login"/>}/>
			</Routes>
		</div>
	);
};

export default PageContainer;
