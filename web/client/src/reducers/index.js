import {combineReducers} from 'redux';

import farms from './farms';
import farmFilter from './farmFilter';
import farmLightBox from './farmLightBox';
import drawer from './drawer';
import discord from './discord';
import global from './global';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farmLightBox,
  drawer,
  discord,
  global
});

export default mainReducer;
