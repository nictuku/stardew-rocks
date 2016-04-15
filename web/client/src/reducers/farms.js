/* eslint-disable no-magic-numbers */
import {handleActions} from 'redux-actions';
import _ from 'lodash';

import {
  GET_FARMS, GET_FARM, SEARCH_FARMS, INCREASE_FARMS_AMOUNT, RESET_FARMS_AMOUNT, CLEAR_FARM
} from '../actionTypes';

const initialState = {
  farm: {},
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
  [GET_FARM]: (state, action) => ({
    ...state,
    farm: {
      ...action.payload,
      Player: action.payload.History[action.payload.History.length - 1].Player,
      sources: _.map(action.payload.History, history => `/screenshot/${action.payload.ID}/${history.Ts}.png`)
    }
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
}, initialState);

export {
  initialState
};

export default farms;
