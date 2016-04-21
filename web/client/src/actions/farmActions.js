import {createAction} from 'redux-actions';
import {
  GET_FARM,
  CLEAR_FARM,
  CLOSE_FARM_LIGHTBOX,
  OPEN_FARM_LIGHTBOX,
  FARM_LIGHTBOX_NEXT,
  FARM_LIGHTBOX_PREV,
  SET_SOURCES_FARM_LIGHTBOX
} from '../actionTypes';
import * as farm from '../services/farm';

export const getFarm = createAction(GET_FARM, farm.getFarm);
export const clearFarm = createAction(CLEAR_FARM);
export const close = createAction(CLOSE_FARM_LIGHTBOX);
export const open = createAction(OPEN_FARM_LIGHTBOX);
export const nextSrc = createAction(FARM_LIGHTBOX_NEXT);
export const prevSrc = createAction(FARM_LIGHTBOX_PREV);

export const setSources = (sources) => ({
  type: SET_SOURCES_FARM_LIGHTBOX,
  sources
});
