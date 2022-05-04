import axios from "axios";

const initialState = {
    categories: [
    ],
    category: null,
    popupDisplay: false,
    editPopupDisplay: false
};

const SET_CATEGORIES = "SET_CATEGORIES";
const CREATE_CATEGORY = "CREATE_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";
const TOGGLE_POPUP = "TOGGLE_POPUP";
const TOGGLE_EDIT_POPUP = "EDIT_POPUP_DISPLAY"


const reducerCategory = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.newCategory]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(cat => cat._id !== action.id)
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(cat => {
                    if (cat._id === action.id) {
                        cat.name = action.name
                    }
                    return cat
                })
            }
        case TOGGLE_POPUP:
            return {
                ...state,
                popupDisplay: !state.popupDisplay
            }
        case TOGGLE_EDIT_POPUP:
            return {
                ...state,
                editPopupDisplay: action.state
            }
        default: {
            return state;
        }
    }
}

export default reducerCategory;

export const categoryActionCreator = {
    setCategories(categories) {
        return {
            type: SET_CATEGORIES,
            categories
        }
    },
    createCategory(newCategory) {
        return {
            type: CREATE_CATEGORY,
            newCategory
        }
    },
    deleteCategory(id) {
        return {
            type: DELETE_CATEGORY,
            id
        }
    },
    updateCategory(id, name) {
        return {
            type: UPDATE_CATEGORY,
            id, name
        }
    },
    togglePopup() {
        return {
            type: TOGGLE_POPUP
        }
    },
    toggleEditPopup(state) {
        return {
            type: TOGGLE_EDIT_POPUP,
            state
        }
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        await axios
            .get('/api/categories/get')
            .then(({ data }) => {
                dispatch(categoryActionCreator.setCategories(data)).then(() => {
                    let h = document.querySelector('header').offsetHeight;
                    document.querySelector('.page-container').style.paddingTop = (h + 40) + 'px'
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createCategory = (category) => {
    return async (dispatch) => {
        await axios
            .post('/api/categories/create', { name: category }, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(({ data }) => {
                dispatch(categoryActionCreator.createCategory(data.category))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        await axios
            .delete(`/api/categories/${categoryId}/delete`, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(() => {
                dispatch(categoryActionCreator.deleteCategory(categoryId))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const updateCategory = (categoryId, name) => {
    return async (dispatch) => {
        await axios
            .put(`/api/categories/${categoryId}/update`, { name }, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(() => {
                dispatch(categoryActionCreator.updateCategory(categoryId, name))
            })
            .catch(error => {
                console.log(error);
            })
    }
}


