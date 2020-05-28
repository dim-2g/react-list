import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function term(state = initialState.term, action) {
    switch (action.type) {
        case types.term.SET:
            return action.term;
        case types.url.INIT_FROM_URL:
            if (action.payload.term) {
                return action.payload.term;
            } else {
                return state;
            }
        default:
            return state;
    }
}
