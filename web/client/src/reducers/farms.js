import {handleActions} from 'redux-actions';

import {
  GET_FARMS, GET_FARM, SEARCH_FARMS, INCREASE_FARMS_AMOUNT, RESET_FARMS_AMOUNT, CLEAR_FARM
} from '../actionTypes';

const farms = handleActions({
  [GET_FARMS]: (state, action) => ({
    ...state,
    farms: action.payload
  }),
  [GET_FARM]: (state, action) => ({
    ...state,
    farm: action.payload
  }),
  [CLEAR_FARM]: (state) => ({
    ...state,
    farm: {}
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
}, {
  farm: {},
  farms: [],
  pages: 1,
  farmsPerPage: 20,
  query: ''
});

export default farms;
