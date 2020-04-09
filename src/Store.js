import {applyMiddleware, createStore} from "redux";
import reducer from './Reducers';
import thunkMiddleware from "redux-thunk";


const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;