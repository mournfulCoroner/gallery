
import './CategoryCard.scss';

function CategoryCard({previewPath, name, date, customClickEvent}) {
	return (
		<div onClick={customClickEvent} className="category-card">
            <img src={previewPath} alt="" />
            <p>{name}</p>
			<p className='category-card__date'>{date.slice(0, 10)}</p>
		</div>
	);
}

export default CategoryCard;
