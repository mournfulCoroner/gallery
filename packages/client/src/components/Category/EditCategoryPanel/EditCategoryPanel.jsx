import { useEffect, useState } from 'react';
import './EditCategoryPanel.scss';
import cross from "../../../assets/images/cancel.png"
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories } from '../../../bll/reducers/reducerCategory';

function EditCategoryPanel() {
	const [ activeAdd, setActiveAdd ] = useState(false);
    const [ categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch();
    const categories = useSelector(state => state.reducerCategory.categories)

    let visibleCategories = categories.map((cat) => <button key={cat._id} className="category-panel__button">{cat.name}</button>)

    useEffect(() => {
        dispatch(getCategories())
        console.log(categories);
    }, [])

    let sendNewCategory = () => {
        if(categoryName.length > 0){
            dispatch(createCategory(categoryName))
            setCategoryName("")
        }
    }

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
							<input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} type="text" />
						</div>
						<button onClick={sendNewCategory} className="input-field__button main-btn">Клик!</button>
                        <button onClick={() => {setActiveAdd(false)}} className="input-field__cross-btn"><img src={cross} alt="close" /></button>
					</div>

					<button
                        onClick={() => {setActiveAdd(true)}}
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
					<div className="category-panel__category-btns">
						{visibleCategories}
					</div>
				</div>
				<div className="category-panel__images-field" />
			</div>
		</div>
	);
}

export default EditCategoryPanel;
