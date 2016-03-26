import {handleActions} from 'redux-actions';

import {
  GET_FARMS, GET_FARM, SEARCH_FARMS
} from '../actionTypes';

const initialState = {
  farm: {},
  farms: []
};

const farms = handleActions({
  GET_FARMS: (state, action) => ({
    ...state,
    farms: action.payload
  }),
  GET_FARM: (state, action) => ({
    ...state,
    farm: action.payload
  }),
  SEARCH_FARMS: (state, action) => ({
    ...state,
    farms: action.payload
  })
}, initialState);

export default farms;
