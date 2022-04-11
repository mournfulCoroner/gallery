import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducerCategory from "./reducers/reducerCategory";
import reducerUser from "./reducers/reducerUser";

const reducer = combineReducers({
    reducerUser,
    reducerCategory
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;