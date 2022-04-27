import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActionCreator } from '../../bll/reducers/reducerCategory';
import { imageActionCreator } from '../../bll/reducers/reducerImage';

function Popup({ categoryId }) {
	const [ imageName, setImageName ] = useState('');
	const [ imageDescription, setImageDescription ] = useState('');
	const [ imageBackground, setImageBackground ] = useState(false);
	const dispatch = useDispatch();

	const loadingImage = useSelector((store) => store.reducerImage.loadingImage);

	const fileUploadHandler = (event) => {
		console.log(event.target.files);
		if (event.target.files.length) {
			let reader = new FileReader();
			reader.onload = (e) => {
				dispatch(imageActionCreator.setLoadingImage(`url(${e.target.result})`));
				setImageBackground(true);
				// console.log("success");
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const clickOnInput = () => {
		if (imageBackground) {
			document.querySelector('#loadImageInput').value = null;
			dispatch(imageActionCreator.setLoadingImage(""));
			setImageBackground(false);
		} else {
			document.querySelector('#loadImageInput').click();
		}
	};

	return (
		<div className="image-popup" onClick={() => dispatch(categoryActionCreator.togglePopup())}>
			<div className="image-popup__content" onClick={(e) => e.stopPropagation()}>
				<div className="image-popup__header">
					<div className="image-popup__title">Загрузка изображения</div>
					<button
						onClick={() => dispatch(categoryActionCreator.togglePopup())}
						className="image-popup__close"
					>
						{categoryId}
						<img src={cross} alt="" />
					</button>
				</div>
				<div className="image-popup__main">
					<div className="image-popup__preview-section">
						<input
							onChange={fileUploadHandler}
							id="loadImageInput"
							type="file"
							accept="image/png, image/jpg, image/jpeg, image/webp"
						/>
						<label htmlFor="loadImageInput" className='main-btn image-popup__load-image-btn'>Загрузить</label>
						<div
							onClick={clickOnInput}
							className={`${imageBackground ? 'load-image image-popup__preview' : 'image-popup__preview'}`}
							style={{ backgroundImage: loadingImage }}
						/>
					</div>
					<div className="image-popup__input-section">
						<input type="text" placeholder="Название" value={imageName} onChange={setImageName} />
						<textarea name="" placeholder="Описание" id="" cols="30" rows="10" />
					</div>
				</div>
				<button className="image-popup__create main-btn">Сохранить</button>
			</div>
		</div>
	);
}

export default Popup;
