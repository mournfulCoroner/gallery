import { useParams } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import './CategoryPage.scss';

function CategoryPage(props) {
    let params = useParams()
    let message = params.id%2===0 ? "Чётная категория" : "Нечётная категория"
	return (
		<div>
            Тут есть элемент:
			<CategoryCard id={params.id} message={message}/>
		</div>
	);
}

export default CategoryPage;
