import {handleActions} from 'redux-actions';
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  DOCK_DRAWER,
  UNDOCK_DRAWER,
  TOGGLE_DRAWER
} from '../actionTypes';

const drawer = handleActions({
  [OPEN_DRAWER]: (state) => ({
    ...state,
    isOpen: true
  }),
  [CLOSE_DRAWER]: (state) => ({
    ...state,
    isOpen: false
  }),
  [DOCK_DRAWER]: (state) => ({
    ...state,
    isDocked: true
  }),
  [UNDOCK_DRAWER]: (state) => ({
    ...state,
    isDocked: false
  }),
  [TOGGLE_DRAWER]: (state) => ({
    ...state,
    isOpen: !state.isOpen
  })
}, {
  isOpen: false,
  isDocked: true
});

export default drawer;
