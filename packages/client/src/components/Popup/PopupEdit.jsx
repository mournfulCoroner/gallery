import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryActionCreator } from '../../bll/reducers/reducerCategory';
import { loadImage } from '../../bll/reducers/reducerImage';

function Popup({ image }) {
	const [ imageName, setImageName ] = useState('');
    const [ imageExtension, setImageExtension] = useState('')
	const [ imageDescription, setImageDescription ] = useState(image.description);

	const [ isLoadingError, setIsLoadingError ] = useState(false);
	const dispatch = useDispatch();

    useEffect(() => {
        setImageExtension(image.name.substring(image.name.lastIndexOf('.'), image.name.length))
        setImageName(image.name.substring(0, files[0].name.lastIndexOf('.')));
    }, [])

    const deleteImage = () => {
        console.log("Delete image!");
    }

	const sendImage = () => {
		if (imageName) {
			dispatch(loadImage(image._id, `${imageName}${imageExtension}`, imageDescription))
				.then(() => {
					dispatch(categoryActionCreator.togglePopup());
				})
				.catch((error) => {
					setIsLoadingError(error);
				});
		} else {
			alert('Необходимые поля не заполнены!');
		}
	};
	return (
		<div className="image-popup" onClick={() => dispatch(categoryActionCreator.toggleEditPopup())}>
			<div className="image-popup__content" onClick={(e) => e.stopPropagation()}>
				<div className="image-popup__header">
					<div className="image-popup__title">Изменение изображения</div>
					<button
						onClick={() => dispatch(categoryActionCreator.toggleEditPopup())}
						className="image-popup__close"
					>
						<img src={cross} alt="" />
					</button>
				</div>
				{!isLoadingError ? (
					<div className="image-popup__main">
						<div
							className="image-popup__preview-section preview-section"
						>
							<div
								onClick={clickOnInput}
								className={'load-image preview-section__preview'}
								style={{ backgroundImage: loadingImage }}
							/>
						</div>

						<div className="image-popup__input-section">
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
					<div className="image-popup__error">
						<p>Ошибка изменения!</p>
						<p>{isLoadingError}</p>
					</div>
				)}
				{isLoadingError ? (
					<button
						onClick={() => dispatch(categoryActionCreator.toggleEditPopup())}
						className="image-popup__create main-btn"
					>
						Закрыть
					</button>
				) : (
					<div>
						<button onClick={deleteImage} className="image-popup__create main-btn">Удалить</button>
						<button onClick={sendImage} className="image-popup__create main-btn">
							Сохранить
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Popup;
