import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';

const mainReducer = combineReducers({
  ...farms.reducers,
  farmFilter
});

export default mainReducer;
