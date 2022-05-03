import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getImages, imageActionCreator } from '../../bll/reducers/reducerImage';
import CategoryCard from '../../components/Category/CategoryCard/CategoryCard';
import ImagePopup from '../../components/Popup/ImagePopup';
import './CategoryPage.scss';

function CategoryPage() {
	const params = useParams(),
		dispatch = useDispatch();
	const images = useSelector((store) => store.reducerImage.images);
	const displayImagePopup = useSelector((store) => store.reducerImage.imagePopupDisplay);

	const [ currentImage, setCurrentImage ] = useState(        {
            _id: 1,
            name: "Закат",
            description: "Описание",
            path: "/files/Закаты/Закат1.jpg",
            previewPath: "/files/Закаты/Закат1-prev.jpg",
            date: "34234234423",
            category: "1"
        });

	useEffect(() => {
		dispatch(getImages(params.id))
	}, [params.id])

	const showPopup = (image) => {
		setCurrentImage(image);
		console.log("here");
		dispatch(imageActionCreator.toggleImagePopup(true));
	};


	return (
		<div className='category-page'>
			<div className="category-page__content">
				{images
					.map((image) => (
						<CategoryCard
							key={image._id}
							customClickEvent={() => {showPopup(image)}}
							previewPath={image.previewPath}
							name={image.name}
							date={image.date}
						/>
					))}
			</div>
			{displayImagePopup && <ImagePopup image={currentImage} />}
		</div>
	);
}

export default CategoryPage;
