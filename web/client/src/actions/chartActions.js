import {createAction} from 'redux-actions';

import {
  CHART_MOUSE_OVER,
  CHART_MOUSE_OUT,
  CHART_MOUSE_MOVE,
  CHART_SET_DATA,
  CHART_CHANGE_SIZE
} from '../actionTypes';

export const mouseOver = createAction(CHART_MOUSE_OVER);
export const mouseOut = createAction(CHART_MOUSE_OUT);
export const mouseMove = createAction(CHART_MOUSE_MOVE);
export const setData = createAction(CHART_SET_DATA);
export const changeSize = createAction(CHART_CHANGE_SIZE);
