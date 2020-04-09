import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from './Reducers';
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todolist: reducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;