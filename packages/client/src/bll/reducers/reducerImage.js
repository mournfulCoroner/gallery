import axios from "axios";

const initialState = {
    loadingImage: "",
    images: []
};

const SET_LOADING_IMAGE = "SET_LOADING_IMAGE";
const SET_IMAGES = "SET_IMAGES";
const ADD_IMAGE = "ADD_IMAGE"

const reducerImage = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_IMAGE:
            return {
                ...state,
                loadingImage: action.image
            }
        case SET_IMAGES:
            return {
                ...state,
                images: action.images
            }
        case ADD_IMAGE:
            return {
                ...state,
                images: [...state.images, action.image]
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
    setImages(images) {
        return {
            type: SET_IMAGES,
            images
        }
    },
    addImage(image){
        return {
            type: ADD_IMAGE,
            image
        }
    }
}

export const loadImage = (file, fileName, categoryId, description) => {
    return async (dispatch) => {
        const formData = new FormData()
        formData.append("file", file, fileName)
        formData.append("categoryId", categoryId)
        formData.append("description", description)
        await axios
            .post('/api/images/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            }).then(({data}) => {
                dispatch(imageActionCreator.addImage(data))
            })
    }
}

export const getImages = (categoryId) => {
    return async (dispatch) => {
        await axios
            .get(`/api/categories/${categoryId}/images`)
            .then(({ data }) => {
                console.log(data);
                dispatch(imageActionCreator.setImages(data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}