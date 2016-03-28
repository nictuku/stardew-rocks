import {createAction} from 'redux-actions';
import {UPDATE_DISCORD} from '../actionTypes';
import {getDiscordInfo} from '../services/discord';

export const updateDiscord = createAction(UPDATE_DISCORD, getDiscordInfo);
