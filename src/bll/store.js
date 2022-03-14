import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducerAgreement from "./reducers/reducerAgreement";


const reducer = combineReducers({
    reducerAgreement
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;