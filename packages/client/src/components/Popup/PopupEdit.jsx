import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryActionCreator } from '../../bll/reducers/reducerCategory';
import { deleteImage, loadImage, updateImage } from '../../bll/reducers/reducerImage';

function PopupEdit({ image }) {
	const [ imageName, setImageName ] = useState('');
	const [ imageExtension, setImageExtension ] = useState('');
	const [ imageDescription, setImageDescription ] = useState(image.description);

	const [ isLoadingError, setIsLoadingError ] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setImageExtension(image.name.substring(image.name.lastIndexOf('.'), image.name.length));
		setImageName(image.name.substring(0, image.name.lastIndexOf('.')));
	}, []);

	const removeImage = () => {
		if (image._id) {
			dispatch(deleteImage(image._id))
				.then(() => {
					dispatch(categoryActionCreator.toggleEditPopup(false));
				})
				.catch((error) => {
					setIsLoadingError(error.response.data.message);
				});
		}
	};

	const sendImage = () => {
		if (imageName) {
			dispatch(updateImage(image._id, imageDescription, `${imageName}${imageExtension}`))
				.then(() => {
					dispatch(categoryActionCreator.toggleEditPopup(false));
				})
				.catch((error) => {
					setIsLoadingError(error.response.data.message);
				});
		} else {
			alert('Необходимые поля не заполнены!');
		}
	};
	return (
		<div className="image-edit-popup" onClick={() => dispatch(categoryActionCreator.toggleEditPopup(false))}>
			<div className="image-edit-popup__content" onClick={(e) => e.stopPropagation()}>
				<div className="image-edit-popup__header">
					<div className="image-edit-popup__title">Изменение изображения</div>
					<button
						onClick={() => dispatch(categoryActionCreator.toggleEditPopup(false))}
						className="image-edit-popup__close"
					>
						<img src={cross} alt="" />
					</button>
				</div>
				{!isLoadingError ? (
					<div className="image-edit-popup__main">
						<div className="image-edit-popup__preview-section preview-section">
							<img src={image.previewPath} alt="" />
						</div>

						<div className="image-edit-popup__input-section">
							<input
								type="text"
								placeholder="Название"
								value={imageName}
								onChange={(e) => setImageName(e.target.value)}
							/>
							<textarea
								name=""
								placeholder="Описание"
								value={imageDescription}
								onChange={(e) => setImageDescription(e.target.value)}
								id=""
								cols="30"
								rows="10"
							/>
						</div>
					</div>
				) : (
					<div className="image-edit-popup__error">
						<p>Ошибка изменения!</p>
						<p>{isLoadingError}</p>
					</div>
				)}
				{isLoadingError ? (
					<button
						onClick={() => dispatch(categoryActionCreator.toggleEditPopup(false))}
						className="image-edit-popup__create main-btn"
					>
						Закрыть
					</button>
				) : (
					<div>
						<button onClick={() => removeImage()} className="image-edit-popup__create main-btn danger">
							Удалить
						</button>
						<button onClick={() => sendImage()} className="image-edit-popup__create main-btn">
							Сохранить
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default PopupEdit;
