import {handleActions} from 'redux-actions';
import {UPDATE_DISCORD} from '../actionTypes';

const discord = handleActions({
  [UPDATE_DISCORD]: (state, {payload}) => ({
    discord: payload
  })
}, {
  discord: {}
});

export default discord;
