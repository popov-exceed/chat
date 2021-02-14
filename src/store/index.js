import {createStore, applyMiddleware, combineReducers} from 'redux'
import {authentication} from "./reducers/auth";
import thunk from 'redux-thunk';
import {message} from "./reducers/message";
import {getOnlineUsers} from "./reducers/onlineUsers";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    auth: authentication,
    messages: message,
    onlineUsers: getOnlineUsers
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)));

export default store;
