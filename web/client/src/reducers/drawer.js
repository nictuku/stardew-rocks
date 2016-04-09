import {handleActions} from 'redux-actions';
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  DOCK_DRAWER,
  UNDOCK_DRAWER,
  TOGGLE_DRAWER,
  UPDATE_AUTODOCK_DRAWER
} from '../actionTypes';

const mql = window.matchMedia(`(min-width: 800px)`);

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
    isOpen: state.mql.matches ? !state.isDocked : !state.isOpen,
    isDocked: state.mql.matches ? !state.isDocked : state.mql.matches
  }),
  [UPDATE_AUTODOCK_DRAWER]: (state) => ({
    ...state,
    isDocked: state.mql.matches
  })
}, {
  isOpen: false,
  isDocked: mql.matches,
  mql
});

export default drawer;
