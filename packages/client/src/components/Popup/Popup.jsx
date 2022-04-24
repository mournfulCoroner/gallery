import './Popup.scss';
import cross from '../../assets/images/cancel.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {categoryActionCreator } from '../../bll/reducers/reducerCategory'

function Popup() {
	const [ imageName, setImageName ] = useState('');
    const dispatch = useDispatch()
    
	return (
		<div className="image-popup" onClick={() => dispatch(categoryActionCreator.togglePopup)}>
			<div className="image-popup__content" onClick={(e) => e.preventDefault()}>
				<div className="image-popup__header">
					<div className="image-popup__title">Загрузка изображения</div>
					<button onClick={() => dispatch(categoryActionCreator.togglePopup)} className="image-popup__close">
						<img src={cross} alt="" />
					</button>
				</div>
				<div className="image-popup__main">
					<div className="image-popup__preview-section">
						<div className="image-popup__preview" />
					</div>
					<div className="image-popup__input-section">
						<input type="text" placeholder="Название" value={imageName} onChange={setImageName} />
						<textarea name="" placeholder="Описание" id="" cols="30" rows="10" />
					</div>
				</div>
				<button className="image-popup__create main-btn">Загрузить</button>
			</div>
		</div>
	);
}

export default Popup;
