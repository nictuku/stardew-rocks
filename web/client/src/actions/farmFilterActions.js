import {CHANGE_FARM_FILTER} from '../actionTypes';

export const changeFilter = (event, index, value) => ({
  type: CHANGE_FARM_FILTER,
  filter: value
});
