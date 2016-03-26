import {
  CLOSE_FARM_LIGHTBOX,
  OPEN_FARM_LIGHTBOX,
  FARM_LIGHTBOX_NEXT,
  FARM_LIGHTBOX_PREV,
  SET_SOURCES_FARM_LIGHTBOX
} from '../actionTypes';

export const close = () => ({
  type: CLOSE_FARM_LIGHTBOX
});

export const open = () => ({
  type: OPEN_FARM_LIGHTBOX
});

export const nextSrc = () => ({
  type: FARM_LIGHTBOX_NEXT
});

export const prevSrc = () => ({
  type: FARM_LIGHTBOX_PREV
});

export const setSources = (sources) => ({
  type: SET_SOURCES_FARM_LIGHTBOX,
  sources
});
