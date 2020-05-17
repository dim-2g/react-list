import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function term(state = initialState.term, action) {
    switch (action.type) {
        case types.term.SET:
            return action.term;
        default:
            return state;
    }
}