
const initialState = {
    users: [{
        nickname: "Admin",
        password: "12345",
        role: ["Administrator"]
    }],
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
    return (dispatch) => {
        if (initialState.users.find((user) => user.nickname === nickname && user.password === password)) {
            dispatch(userActionCreator.login("authorization", nickname));
            localStorage.setItem("authorization", nickname)
            localStorage.setItem("password", password)
        }
        else {
            dispatch(userActionCreator.changeLoginError("Ошибка авторизации"));
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(userActionCreator.logout());
        localStorage.removeItem("authorization");
        localStorage.removeItem("logout");
    }
}
