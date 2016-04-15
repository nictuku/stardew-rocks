/* eslint-disable no-magic-numbers */
import {handleActions} from 'redux-actions';

import {
  GET_FARMS, SEARCH_FARMS, INCREASE_FARMS_AMOUNT, RESET_FARMS_AMOUNT
} from '../actionTypes';

const initialState = {
  farms: [],
  pages: 1,
  farmsPerPage: 20,
  query: ''
};

const farms = handleActions({
  [GET_FARMS]: (state, action) => ({
    ...state,
    farms: action.payload
  }),
  [SEARCH_FARMS]: (state, action) => ({
    ...state,
    pages: 1,
    farms: action.payload
  }),
  [INCREASE_FARMS_AMOUNT]: (state) => ({
    ...state,
    pages: state.farms.length - ((state.pages + 1) * state.farmsPerPage) > -state.farmsPerPage ? state.pages + 1 : state.pages // eslint-disable-line no-magic-numbers
  }),
  [RESET_FARMS_AMOUNT]: (state) => ({
    ...state,
    pages: 1
  })
}, initialState);

export {
  initialState
};

export default farms;
