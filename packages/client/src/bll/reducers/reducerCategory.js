import axios from "axios";

const initialState = {
    categories: [],
    category: null
};

const SET_CATEGORIES = "SET_CATEGORIES";
const CREATE_CATEGORY = "CREATE_CATEGORY";

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
    }
}

export const categoryGetters = {
    getCategories(state) {
        return state.reducerCategory.categories;
    },
}

export const getCategories = () => {
    return async (dispatch) => {
        await axios
            .get('/api/categories/get')
            .then(({ data }) => {
                dispatch(categoryActionCreator.setCategories(data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createCategory = (category) => {
    return async (dispatch) => {
        await axios
            .post('/api/categories/create', { name: category }, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } } )
            .then(({data}) => {
                dispatch(categoryActionCreator.createCategory(data.category))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

