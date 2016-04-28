import {handleActions} from 'redux-actions';

import {
  CHART_MOUSE_OVER,
  CHART_MOUSE_OUT,
  CHART_MOUSE_MOVE,
  CHART_SET_DATA,
  CHART_CHANGE_SIZE,
  CHART_SET_TOOLTIP
} from '../actionTypes';

export const initialState = {
  data: [],
  isHover: false,
  mouseLocation: {x: 0, y: 0},
  tooltip: {x: 0, y: 0, text: ""},
  size: {width: 0, height: 0}
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
  }),
  [CHART_SET_TOOLTIP]: (state, {payload}) => ({
    ...state,
    tooltip: payload
  })
}, initialState);
