import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';
import farmLightBox from './farmLightBox';
import drawer from './drawer';
import discord from './discord';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farmLightBox,
  drawer,
  discord
});

export default mainReducer;
