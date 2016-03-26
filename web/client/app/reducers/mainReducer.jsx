import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';
import farmLightBox from './farmLightBox';

const mainReducer = combineReducers({
  ...farms.reducers,
  farmFilter,
  farmLightBox
});

export default mainReducer;
