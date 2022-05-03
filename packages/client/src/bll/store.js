import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducerCategory from "./reducers/reducerCategory";
import reducerUser from "./reducers/reducerUser";
import reducerImage from "./reducers/reducerImage";
import reducerQuestion from "./reducers/reducerQuestion";

const reducer = combineReducers({
    reducerUser,
    reducerCategory,
    reducerImage,
    reducerQuestion
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;