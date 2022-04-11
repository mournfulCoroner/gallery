import axios from "axios";

const initialState = {
    users: [],
    user: {},
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
                user: {
                    nickname: action.nickname,
                    role: action.role
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
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
    login(nickname, role) {
        return {
            type: LOGIN,
            nickname,
            role
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
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.user.nickname, data.user.role))
            })
            .catch(error => {
                dispatch(userActionCreator.changeLoginError(error.response.data.message));
            })
    }
}

export const auth = () => {
    return async (dispatch) => {
        await axios
            .get('/api/users/auth', { headers:{Authorization: `Bearer ${localStorage.getItem('authorization')}`}})
            .then(({ data }) => {
                localStorage.setItem("authorization", data.token)
                dispatch(userActionCreator.login(data.user.nickname, data.user.role))
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
