import {
  CHANGE_SEASON,
  CHANGE_SEASON_DEFAULT
} from '../actionTypes';
import {createAction} from 'redux-actions';

export const changeSeason = createAction(CHANGE_SEASON);
export const changeSeasonDefault = createAction(CHANGE_SEASON_DEFAULT);
