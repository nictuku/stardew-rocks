import {combineReducers} from 'redux';

import farms from './farms';
import farm from './farm';
import farmFilter from './farmFilter';
import drawer from './drawer';
import discord from './discord';
import global from './global';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farm,
  drawer,
  discord,
  global
});

export default mainReducer;
