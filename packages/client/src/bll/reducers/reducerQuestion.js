import axios from "axios";

const initialState = {
    questions: []
};

const SET_QUESTIONS = "SET_QUESTIONS";
const READ_QUESTION = "READ_QUESTION";
const DELETE_QUESTION = "DELETE_QUESTION"


const reducerQuestion = (state = initialState, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(cat => cat._id !== action.id)
            }
        case READ_QUESTION:
            return {
                ...state,
                questions: state.questions.map(cat => {
                    if (cat._id === action.id) {
                        cat.unread = false
                    }
                    return cat
                })
            }
        default: {
            return state;
        }
    }
}

export default reducerQuestion;

export const questionActionCreator = {
    setQuestions(questions) {
        return {
            type: SET_QUESTIONS,
            questions
        }
    },
    deleteQuestion(id) {
        return {
            type: DELETE_QUESTION,
            id
        }
    },
    readQuestion(id) {
        return {
            type: READ_QUESTION,
            id
        }
    },
}


export const getQuestions = () => {
    return async (dispatch) => {
        await axios
            .get('/api/questions/get')
            .then(({ data }) => {
                dispatch(questionActionCreator.setQuestions(data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createQuestion = (question) => {
    return async () => {
        await axios
            .post('/api/questions/create', { ...question }, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
    }
}

export const deleteQuestion = (questionId) => {
    return async (dispatch) => {
        await axios
            .delete(`/api/questions/${questionId}/delete`, { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(() => {
                dispatch(questionActionCreator.deleteQuestion(questionId))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const readQuestion = (questionId) => {
    return async (dispatch) => {
        await axios
            .put(`/api/questions/${questionId}/read`, {},  { headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` } })
            .then(() => {
                dispatch(questionActionCreator.readQuestion(questionId))
            })
            .catch(error => {
                console.log(error);
            })
    }
}


