
import './CategoryCard.scss';

function CategoryCard({id, message, name}) {
	return (
		<div className="category-card">
            <p>Это сообщение с id - {id} </p>
            <p>Сообщение: {message}</p>
			<p>Имя: {name}</p>
		</div>
	);
}

export default CategoryCard;
