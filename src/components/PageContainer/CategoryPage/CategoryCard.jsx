
import './CategoryPage.scss';

function CategoryCard({id, message}) {
	return (
		<div className="category-card">
            Это страница с id - {id} <br/> 
            Сообщение: {message}
		</div>
	);
}

export default CategoryCard;
