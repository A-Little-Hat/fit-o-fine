import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as allReducers from "./reducers";

const store = createStore(combineReducers(allReducers), applyMiddleware(thunk));

export default store;
