import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';
import farmLightBox from './farmLightBox';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farmLightBox
});

export default mainReducer;
