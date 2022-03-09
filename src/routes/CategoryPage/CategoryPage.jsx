import { useParams } from 'react-router-dom';
import CategoryCard from '../../components/Category/CategoryCard/CategoryCard';
import './CategoryPage.scss';

function CategoryPage() {
	let params = useParams();
	let categories = [
		{
			id: 1,
			name: 'category1',
			message: 'mes1'
		},
		{
			id: 2,
			name: 'category2',
			message: 'mes2'
		},
		{
			id: 3,
			name: 'category3',
			message: 'mes3'
		}
	];
	let cards = categories.map((category) => <CategoryCard name={category.name} id={category.id} message={category.message} />)
	return (
		<div>
			На странице {params.id} есть элементы:
			{
				cards
			}
		</div>
	);
}

export default CategoryPage;
