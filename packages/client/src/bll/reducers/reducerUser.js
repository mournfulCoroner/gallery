import axios from "axios";

const initialState = {
    users: [],
    authorization: "",
    nickname: "",
    loginError: ""
};

const LOGIN = "LOGIN";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            }
        case LOGIN:
            return {
                ...state,
                authorization: action.authorization,
                nickname: action.nickname
            }
        case LOGOUT:
            return {
                ...state,
                authorization: "",
                nickname: ""
            }
        default: {
            return state;
        }
    }
}

export default reducerUser;

export const userActionCreator = {
    changeLoginError(loginError) {
        return {
            type: LOGIN_ERROR,
            loginError
        }
    },
    login(authorization, nickname) {
        return {
            type: LOGIN,
            authorization,
            nickname
        }
    },
    logout() {
        return {
            type: LOGOUT
        }
    }
}

export const userGetters = {
    getLoginError(state) {
        return state.reducerUser.loginError;
    },
    getNickname(state) {
        return state.reducerUser.nickname;
    },
    getAuthorization(state) {
        return state.reducerUser.authorization;
    }
}

export const login = (nickname, password) => {
    return async (dispatch) => {
        await axios
            .post('/api/users/login', {nickname, password})
            .then(({data}) => {
                console.log(data);
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.token, data.user.nickname))
            })
            .catch(error => {
                dispatch(userActionCreator.changeLoginError(error.response.data.message));
            })
    }
}

export const auth = (token) => {
    return async (dispatch) => {
        await axios
            .get('/api/users/auth', { headers:{Authorization: `Bearer ${localStorage.getItem('authorization')}`}})
            .then(({ data }) => {
                console.log(data);
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.token, data.user.nickname))
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem('authorization')
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(userActionCreator.logout());
        localStorage.removeItem("authorization");
    }
}
