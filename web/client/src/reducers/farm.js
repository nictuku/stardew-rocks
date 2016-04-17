/* eslint-disable no-magic-numbers */
import {handleActions} from 'redux-actions';
import map from 'lodash/map';
import  {
  GET_FARM,
  CLEAR_FARM,
  CLOSE_FARM_LIGHTBOX,
  OPEN_FARM_LIGHTBOX,
  FARM_LIGHTBOX_NEXT,
  FARM_LIGHTBOX_PREV,
  SET_SOURCES_FARM_LIGHTBOX
} from '../actionTypes';

export const initialState = {
  farm: {},
  index: 0,
  mainSrc: '',
  nextSrc: '',
  prevSrc: '',
  sources: [],
  isOpen: false,
  currentDate: ''
};

const nextIndex = (index, length) => ((index + 1) % length);
const prevIndex = (index, length) => ((index + length - 1) % length);

const farm = handleActions({
  [GET_FARM]: (state, action) => {
    const index = action.payload.History.length - 1;
    const farmInfo = action.payload.History[index];
    const sources = map(action.payload.History, history => `/screenshot/${action.payload.ID}/${history.Ts}.png`);
    return {
      ...state,
      farm: {
        ...action.payload,
        LastSave: farmInfo.Ts,
        CurrentSeason: farmInfo.CurrentSeason,
        Player: farmInfo.Player
      },
      sources,
      index,
      currentDate: farmInfo.Player.DateStringForSaveGame,
      prevSrc: sources[index - 1],
      mainSrc: sources[index],
      nextSrc: sources[0]
    };
  },
  [CLEAR_FARM]: (state) => ({
    ...state,
    farm: {}
  }),
  [CLOSE_FARM_LIGHTBOX]: (state) => ({
    ...state,
    isOpen: false
  }),
  [OPEN_FARM_LIGHTBOX]: (state) => ({
    ...state,
    isOpen: true
  }),
  [FARM_LIGHTBOX_NEXT]: (state) => {
    const next = nextIndex(state.index, state.sources.length);
    return {
      ...state,
      index: next,
      currentDate: state.farm.History[next].Player.DateStringForSaveGame,
      prevSrc: state.sources[state.index],
      mainSrc: state.sources[next],
      nextSrc: state.sources[nextIndex(next, state.sources.length)]
    };
  },
  [FARM_LIGHTBOX_PREV]: (state) => {
    const prev = prevIndex(state.index, state.sources.length);
    return {
      ...state,
      index: prev,
      currentDate: state.farm.History[prev].Player.DateStringForSaveGame,
      prevSrc: state.sources[prevIndex(prev, state.sources.length)],
      mainSrc: state.sources[prev],
      nextSrc: state.sources[state.index]
    };
  }
}, initialState);

export default farm;
