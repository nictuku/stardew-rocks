import {combineReducers} from 'redux';

import farms from './farms';

const mainReducer = combineReducers(farms.reducers);

export default mainReducer;
