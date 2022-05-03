import axios from "axios";

const initialState = {
    loadingImage: "",
    images: [
        {
            _id: 1,
            name: "Закат",
            description: "Описание",
            path: "/files/Закаты/Закат1.jpg",
            previewPath: "/files/Закаты/Закат1-prev.jpg",
            date: "34234234423",
            category: "1"
        }
    ],
    imagePopupDisplay: false
};

const SET_LOADING_IMAGE = "SET_LOADING_IMAGE";
const SET_IMAGES = "SET_IMAGES";
const ADD_IMAGE = "ADD_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";
const UPDATE_IMAGE = "UPDATE_IMAGE";
const TOOGLE_IMAGE_POPUP = "TOGGLE_IMAGE_POPUP"

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
        case DELETE_IMAGE:
            return {
                ...state,
                images: state.images.filter((image) => image._id !== action.imageId)
            }
        case UPDATE_IMAGE:
            return {
                ...state,
                images: state.images.map((img) => {
                    if (img._id === action.imageId) {
                        img.description = action.description
                        img.name = action.name
                    }
                    return img
                })
            }
        case TOOGLE_IMAGE_POPUP:
            return {
                ...state,
                imagePopupDisplay: action.state
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
    addImage(image) {
        return {
            type: ADD_IMAGE,
            image
        }
    },
    deleteImage(imageId) {
        return {
            type: DELETE_IMAGE,
            imageId
        }
    },
    updateImage(imageId, description, name) {
        return {
            type: UPDATE_IMAGE,
            imageId, description, name
        }
    },
    toggleImagePopup(state) {
        return {
            type: TOOGLE_IMAGE_POPUP,
            state
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
            }).then(({ data }) => {
                dispatch(imageActionCreator.addImage(data))
            })
    }
}

export const getImages = (categoryId) => {
    return async (dispatch) => {
        await axios
            .get(`/api/categories/${categoryId}/images`)
            .then(({ data }) => {
                dispatch(imageActionCreator.setImages(data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const deleteImage = (imageId) => {
    return async (dispatch) => {
        await axios
            .delete(`/api/images/delete/${imageId}`)
            .then(() => {
                dispatch(imageActionCreator.deleteImage(imageId))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const updateImage = (imageId, description, name) => {
    return async (dispatch) => {
        await axios
            .delete(`/api/images/update/${imageId}`, {description, name})
            .then(() => {
                dispatch(imageActionCreator.updateImage(imageId, description, name))
            })
            .catch(error => {
                console.log(error);
            })
    }
}