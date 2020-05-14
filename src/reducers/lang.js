import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function lang(state = initialState.lang, action) {
    switch (action.type) {
        case types.lang.SET:
            return action.lang;
        default:
            return state;
    }
}