import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createWrapper} from 'next-redux-wrapper';
import rootReducer from './reducers/rootReducer';

const initState = {};
const middlewares = [logger, thunk];

const makeStore = () => createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(...middlewares)));

export const wrapper = createWrapper(makeStore);