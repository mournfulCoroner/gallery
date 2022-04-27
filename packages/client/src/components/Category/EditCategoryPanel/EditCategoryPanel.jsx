import { useEffect, useState } from 'react';
import './EditCategoryPanel.scss';
import cross from '../../../assets/images/cancel.png';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getCategories, updateCategory, categoryActionCreator } from '../../../bll/reducers/reducerCategory';
import Popup from './../../Popup/Popup';

function EditCategoryPanel() {
	const [ activeAdd, setActiveAdd ] = useState(false);
	const [ categoryName, setCategoryName ] = useState('');
	const [ currentCategory, setCurrentCategory ] = useState(0);
	const [ activeEditName, setActiveEditName ] = useState('');
	const [ categoryEditName, setCategoryEditName ] = useState('');
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.reducerCategory.categories);
	const popupDisplay = useSelector((state) => state.reducerCategory.popupDisplay);

	const disableActiveEdit = () => {
		if (categoryEditName && categoryEditName !== activeEditName) {
			dispatch(updateCategory(currentCategory, categoryEditName));
		}
		if (!categoryEditName) {
			alert('Поле не заполнено');
		}
		setActiveEditName('');
	};

	const removeCategory = () => {
		dispatch(deleteCategory(currentCategory));
		setCurrentCategory(0);
	};

	let visibleCategories = categories.map((cat) => (
		<div
			onDoubleClick={() => {
				setActiveEditName(cat.name);
				setCategoryEditName(cat.name);
			}}
			key={cat._id}
		>
			{activeEditName == cat.name ? (
				<input
					type="text"
					autoFocus={true}
					onBlur={disableActiveEdit}
					onChange={(e) => setCategoryEditName(e.currentTarget.value)}
					value={categoryEditName}
				/>
			) : (
				<button
					onClick={() => setCurrentCategory(cat._id)}
					className={currentCategory == cat._id ? 'category-panel__button active' : 'category-panel__button'}
				>
					{cat.name}
				</button>
			)}
		</div>
	));

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	let sendNewCategory = () => {
		if (categoryName.length > 0) {
			dispatch(createCategory(categoryName));
			setCategoryName('');
		}
	};

	return (
		<div className="category-panel">
			<div className="category-panel__content">
				<div className="category-panel__buttons">
					<div
						className={
							activeAdd ? (
								'category-panel__input-field input-field active'
							) : (
								'category-panel__input-field input-field'
							)
						}
					>
						<div className="input-field__input">
							<input
								value={categoryName}
								onChange={(event) => setCategoryName(event.target.value)}
								type="text"
							/>
						</div>
						<button onClick={sendNewCategory} className="input-field__button main-btn mt-25">
							Клик!
						</button>
						<button
							onClick={() => {
								setActiveAdd(false);
							}}
							className="input-field__cross-btn"
						>
							<img src={cross} alt="close" />
						</button>
					</div>

					<button
						onClick={() => {
							setActiveAdd(true);
						}}
						className={
							activeAdd ? (
								'inactive category-panel__button category-panel__add-btn'
							) : (
								'category-panel__button category-panel__add-btn'
							)
						}
					>
						Добавить
					</button>
					<div className="category-panel__category-btns">{visibleCategories}</div>
				</div>
				<div className="category-panel__edit-field">
					{currentCategory !== 0 && (
						<div className="edit-category">
							<div className="edit-category__btns">
								<button onClick={() => dispatch(categoryActionCreator.togglePopup())} className="main-btn">Добавить картинку</button>
								<button className="main-btn danger" onClick={removeCategory}>
									Удалить категорию
								</button>
							</div>
							<div className="edit-category__images" />
						</div>
					)}
				</div>
			</div>
		
			      {popupDisplay && <Popup categoryId={currentCategory}/>}
		</div>
	);
}

export default EditCategoryPanel;
