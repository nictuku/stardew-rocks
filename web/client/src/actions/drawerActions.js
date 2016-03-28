import {createAction} from 'redux-actions';
import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  DOCK_DRAWER,
  UNDOCK_DRAWER,
  TOGGLE_DRAWER,
  UPDATE_AUTODOCK_DRAWER
} from '../actionTypes';

export const openDrawer = createAction(OPEN_DRAWER);
export const closeDrawer = createAction(CLOSE_DRAWER);
export const dockDrawer = createAction(DOCK_DRAWER);
export const undockDrawer = createAction(UNDOCK_DRAWER);
export const toggleDrawer = createAction(TOGGLE_DRAWER);
export const updateAutoDock = createAction(UPDATE_AUTODOCK_DRAWER);
