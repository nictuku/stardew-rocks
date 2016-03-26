import {
  CLOSE_FARM_LIGHTBOX,
  OPEN_FARM_LIGHTBOX,
  FARM_LIGHTBOX_NEXT,
  FARM_LIGHTBOX_PREV,
  SET_SOURCES_FARM_LIGHTBOX
} from '../actionTypes';

const initialState = {
  index: 0,
  mainSrc: '',
  nextSrc: '',
  prevSrc: '',
  sources: [],
  isOpen: false
};

const nextIndex = (index, length) => ((index + 1) % length);
const prevIndex = (index, length) => ((index + length - 1) % length);

const farmLightBox = (state=initialState, action) => {
  const next = nextIndex(state.index, state.sources.length);
  const prev = prevIndex(state.index, state.sources.length);

  switch(action.type) {
  case CLOSE_FARM_LIGHTBOX:
    return {
      ...state,
      isOpen: false
    };
  case OPEN_FARM_LIGHTBOX:
    return {
      ...state,
      isOpen: true
    };
  case FARM_LIGHTBOX_NEXT:
    return {
      ...state,
      index: next,
      prevSrc: state.sources[state.index],
      mainSrc: state.sources[next],
      nextSrc: state.sources[nextIndex(next, state.sources.length)],
    };
  case FARM_LIGHTBOX_PREV:
    return {
      ...state,
      index: prev,
      prevSrc: state.sources[prevIndex(prev, state.sources.length)],
      mainSrc: state.sources[prev],
      nextSrc: state.sources[state.index]
    };
  case SET_SOURCES_FARM_LIGHTBOX:
    return {
      ...state,
      index: 0,
      sources: action.sources,
      prevSrc: action.sources[action.sources.length - 1],
      mainSrc: action.sources[0],
      nextSrc: action.sources[1]
    };
  default:
    return state;
  }
};

export default farmLightBox;
