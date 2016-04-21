import {createAction} from 'redux-actions';

import {
  GET_FARMS,
  SEARCH_FARMS,
  INCREASE_FARMS_AMOUNT,
  RESET_FARMS_AMOUNT
} from '../actionTypes';

import * as farm from '../services/farm';

export const getFarms = createAction(GET_FARMS, farm.getFarms);
export const searchFarms = createAction(SEARCH_FARMS, farm.searchFarms);
export const increaseAmount = createAction(INCREASE_FARMS_AMOUNT);
export const resetAmount = createAction(RESET_FARMS_AMOUNT);
