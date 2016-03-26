import {createAction} from 'redux-actions';
import {
  GET_FARMS, GET_FARM, SEARCH_FARMS
} from '../actionTypes';
import * as farm from '../services/farm';

export const getFarms = createAction(GET_FARMS, farm.getFarms);
export const getFarm = createAction(GET_FARM, farm.getFarm);
export const searchFarms = createAction(SEARCH_FARMS, farm.searchFarms);
