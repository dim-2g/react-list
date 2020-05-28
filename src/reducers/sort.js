import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function sortBy(state = initialState.sortBy, action) {
    switch (action.type) {
        case types.sort.SET:
            return action.payload;
        case types.sort.SET_SORT_USERS:
            if (state != action.payload.sortBy) {
                return action.payload.sortBy
            } else {
                return state;
            }
        case types.url.INIT_FROM_URL:
            if (action.payload.sort_by) {
                return action.payload.sort_by;
            } else {
                return state;
            }
        default:
            return state;
    }
}

export function sortDir(state = initialState.sortDir, action) {
    switch (action.type) {
        case types.sort.SET_DIR:
            return action.payload;
        case types.sort.SET_SORT_USERS:
            if (state != action.payload.sortDir) {
                return action.payload.sortDir
            } else {
                return state;
            }
        case types.url.INIT_FROM_URL:
            if (action.payload.sort_dir) {
                return action.payload.sort_dir;
            } else {
                return state;
            }
        default:
            return state;
    }
}
