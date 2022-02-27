import { Route, Routes } from 'react-router-dom';
import CategoryPage from './CategoryPage/CategoryPage';
import Home from './Home/Home';
import './PageContainer.scss';

const PageContainer = () => {
    return (
        <div className="page-container">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            <Route path='/category/:id' element={<CategoryPage/>}></Route>
            </Routes>
        </div>
    );
}

export default PageContainer;