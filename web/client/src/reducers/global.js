import {handleActions} from 'redux-actions';
import {
  CHANGE_SEASON,
  CHANGE_SEASON_DEFAULT
} from '../actionTypes';

export const initialState = {
  season: 'night'
};

const global = handleActions({
  [CHANGE_SEASON]: (state, {payload}) => ({
    season: payload  
  }),
  [CHANGE_SEASON_DEFAULT]: () => initialState
}, initialState);

export default global;
