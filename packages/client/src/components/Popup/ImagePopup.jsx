import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { imageActionCreator } from '../../bll/reducers/reducerImage';
function ImagePopup({ image }) {
	const dispatch = useDispatch();

	return (
		<div
			className="image-popup image-edit-popup"
			onClick={() => dispatch(imageActionCreator.toggleImagePopup(false))}
		>
			<div className="image-popup__content image-edit-popup__content" onClick={(e) => e.stopPropagation()}>
				<div className="image-popup__header image-edit-popup__header">
					<div className="image-edit-popup__title">{image.name}</div>
					<div className="image-popup__date">{image.date.slice(0, 10)}</div>

					<button
						onClick={() => dispatch(imageActionCreator.toggleImagePopup(false))}
						className="image-edit-popup__close"
					>
						<img src={cross} alt="" />
					</button>
				</div>
				<div className="image-popup__main">
					<div className="image-popup__image">
						<img src={image.path} alt="" />
					</div>

					<div className="image-popup__description">{image.description}</div>
				</div>
			</div>
		</div>
	);
}

export default ImagePopup;
