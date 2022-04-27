import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducerCategory from "./reducers/reducerCategory";
import reducerUser from "./reducers/reducerUser";
import reducerImage from "./reducers/reducerImage";

const reducer = combineReducers({
    reducerUser,
    reducerCategory,
    reducerImage
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;