import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActionCreator } from '../../bll/reducers/reducerCategory';
import { loadImage } from '../../bll/reducers/reducerImage';
import imagePic from '../../assets/images/image.png';

function Popup({ categoryId }) {
	const [ imageName, setImageName ] = useState('');
	const [ imageDescription, setImageDescription ] = useState('');
	const [ imageBackground, setImageBackground ] = useState(false);
	const [ imageFile, setImageFile ] = useState(null);
	const [ loadingImage, setLoadingImage ] = useState('');
	const [ isLoadingError, setIsLoadingError ] = useState(false);
	const [ dragEnter, setDragEnter ] = useState(false);
	const [timer, setTimer] = useState(null)

	let progress = useSelector(state => state.reducerImage.progress)
	const dispatch = useDispatch();

	const fileUploadHandler = (event) => {
		const files = event.target.files;
		if (files.length) {
			setImageFile(files[0]);
			setImageName(files[0].name.substring(0, files[0].name.lastIndexOf('.')));
			let reader = new FileReader();
			reader.onload = (e) => {
				setLoadingImage(`url(${e.target.result})`);
				setImageBackground(true);
				// console.log("success");
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};
	const clickOnInput = () => {
		if (imageBackground) {
			document.querySelector('#loadImageInput').value = null;
			setLoadingImage('');
			setImageBackground(false);
			setImageFile(null);
			setImageName('');
			setImageDescription('');
		} else {
			document.querySelector('#loadImageInput').click();
		}
	};

	const sendImage = () => {
		if(imageFile && imageName){
					const extension = imageFile.name.substring(imageFile.name.lastIndexOf('.'), imageFile.name.length);
		dispatch(loadImage(imageFile, `${imageName}${extension}`, categoryId, imageDescription))
			.then(() => {
				dispatch(categoryActionCreator.togglePopup());
			})
			.catch((error) => {
				setIsLoadingError(error);
			});
		}
		else{
			alert("Необходимые поля не заполнены!")
		}

	};

	const onDragEnterHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragEnter(true);
	};
	const onDragLeaveHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let timer = setTimeout(() => {
			setDragEnter(false);
		}, 100)
		setTimer(timer)
	};
	const onDragOverHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if(timer){
			clearTimeout(timer)
		}
		setDragEnter(true);
	};
	const dropHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let file = e.dataTransfer.files[0];
		if (
			file &&
			(file.type == 'image/png' ||
				file.type == 'image/jpg' ||
				file.type == 'image/jpeg' ||
				file.type == 'image/webp')
		) {
			setImageFile(file);
			setImageName(file.name.substring(0, file.name.lastIndexOf('.')));
			let reader = new FileReader();
			reader.onload = (e) => {
				setLoadingImage(`url(${e.target.result})`);
				setImageBackground(true);
			};
			reader.readAsDataURL(file);
		}
		setDragEnter(false);
	};

	return (
		<div className="image-edit-popup" onClick={() => dispatch(categoryActionCreator.togglePopup())}>
			<div className="image-edit-popup__content" onClick={(e) => e.stopPropagation()}>
				<div className="image-edit-popup__header">
					<div className="image-edit-popup__title">Загрузка изображения</div>
					<button
						onClick={() => dispatch(categoryActionCreator.togglePopup())}
						className="image-edit-popup__close"
					>
						<img src={cross} alt="" />
					</button>
					<div className="image-edit-popup__loading" style={{width: progress + '%'}}></div>
				</div>
				{!isLoadingError ? (
					<div className="image-edit-popup__main">
						{dragEnter ? (
							<div
								className="image-edit-popup__preview-section preview-section"
								onDragEnter={onDragEnterHandler}
								onDragLeave={onDragLeaveHandler}
								onDragOver={onDragOverHandler}
								onDrop={dropHandler}
							>
								<div className="preview-section__enter-zone">
									<img src={imagePic} alt="" />
									<span>Опускаем картинку</span>
								</div>
							</div>
						) : (
							<div
								className="image-edit-popup__preview-section preview-section"
								onDragEnter={onDragEnterHandler}
								onDragLeave={onDragLeaveHandler}
								onDragOver={onDragOverHandler}
							>
								<input
									onChange={fileUploadHandler}
									id="loadImageInput"
									type="file"
									accept="image/png, image/jpg, image/jpeg, image/webp"
								/>
								<label htmlFor="loadImageInput" className="main-btn preview-section__load-image-btn">
									Загрузить
								</label>
								<div
									onClick={clickOnInput}
									className={`${imageBackground
										? 'load-image preview-section__preview'
										: 'preview-section__preview'}`}
									style={{ backgroundImage: loadingImage }}
								/>
							</div>
						)}
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
						<p>Ошибка загрузки!</p>
						<p>{isLoadingError}</p>
					</div>
				)}
				{isLoadingError ? (
					<button
						onClick={() => dispatch(categoryActionCreator.togglePopup())}
						className="image-edit-popup__create main-btn"
					>
						Закрыть
					</button>
				) : (
					<button onClick={sendImage} className="image-edit-popup__create main-btn">
						Сохранить
					</button>
				)}
			</div>
		</div>
	);
}

export default Popup;
