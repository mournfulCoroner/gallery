import { combineReducers, createStore } from "redux";
import reducerAgreement from "./reducers/reducerAgreement";


const reducer = combineReducers({
    reducerAgreement
});

const store = createStore(reducer);

export default store;