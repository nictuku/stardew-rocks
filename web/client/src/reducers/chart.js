import {handleActions} from 'redux-actions';

import {
  CHART_MOUSE_OVER,
  CHART_MOUSE_OUT,
  CHART_MOUSE_MOVE,
  CHART_SET_DATA,
  CHART_CHANGE_SIZE
} from '../actionTypes';

export const initialState = {
  data: [],
  isHover: false,
  mouseLocation: {x: 0, y: 0},
  size: {x: 0, y: 0}
};

export default handleActions({
  [CHART_MOUSE_OVER]: state => ({
    ...state,
    isHover: true
  }),
  [CHART_MOUSE_OUT]: state => ({
    ...state,
    isHover: false
  }),
  [CHART_MOUSE_MOVE]: (state, {payload}) => ({
    ...state,
    mouseLocation: payload
  }),
  [CHART_SET_DATA]: (state, {payload}) => ({
    ...state,
    data: payload
  }),
  [CHART_CHANGE_SIZE]: (state, {payload}) => ({
    ...state,
    size: payload
  })
}, initialState);
