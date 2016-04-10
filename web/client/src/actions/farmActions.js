import {createAction} from 'redux-actions';
import {
  GET_FARMS,
  GET_FARM,
  SEARCH_FARMS,
  INCREASE_FARMS_AMOUNT,
  RESET_FARMS_AMOUNT,
  CLEAR_FARM
} from '../actionTypes';
import * as farm from '../services/farm';

export const getFarms = createAction(GET_FARMS, farm.getFarms);
export const searchFarms = createAction(SEARCH_FARMS, farm.searchFarms);
export const increaseAmount = createAction(INCREASE_FARMS_AMOUNT);
export const resetAmount = createAction(RESET_FARMS_AMOUNT);

export const getFarm = createAction(GET_FARM, farm.getFarm);
export const clearFarm = createAction(CLEAR_FARM);
