import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';
import farmLightBox from './farmLightBox';
import drawer from './drawer';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farmLightBox,
  drawer
});

export default mainReducer;
