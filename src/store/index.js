import {createStore, applyMiddleware, combineReducers} from 'redux'
import {authentication} from "./reducers/auth";
import thunk from 'redux-thunk';
import {message} from "./reducers/message";

const rootReducer = combineReducers({
    auth: authentication,
    messages: message
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
