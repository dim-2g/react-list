import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function sortBy(state = initialState.sortBy, action) {
    switch (action.type) {
        case types.sort.SET:
            return action.payload;
        default:
            return state;
    }
}

export function sortDir(state = initialState.sortDir, action) {
    switch (action.type) {
        case types.sort.SET_DIR:
            return action.payload;
        default:
            return state;
    }
}