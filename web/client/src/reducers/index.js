import {combineReducers} from 'redux';

import farms from './farms';
import farm from './farm';
import farmFilter from './farmFilter';
import drawer from './drawer';
import discord from './discord';
import global from './global';
import chart from './chart';

const mainReducer = combineReducers({
  farms,
  farmFilter,
  farm,
  drawer,
  discord,
  global,
  chart
});

export default mainReducer;
