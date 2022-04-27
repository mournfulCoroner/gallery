import axios from "axios";

const initialState = {
    loadingImage: ""
};

const SET_LOADING_IMAGE = "SET_LOADING_IMAGE";


const reducerImage = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_IMAGE:
            return {
                ...state,
                loadingImage: action.image
            }
        default: {
            return state;
        }
    }
}

export default reducerImage;

export const imageActionCreator = {
    setLoadingImage(image) {
        return {
            type: SET_LOADING_IMAGE,
            image
        }
    },
}

export const loadImage = (file, categoryId, description) => {
    return async () => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("categoryId", categoryId)
        formData.append("description", description)
        await axios
            .post('/api/images/upload', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .catch(error => {
                console.log(error);
            })
    }
}