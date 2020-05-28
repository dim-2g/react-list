import * as types from '../constants/types';

export function setSortBy(key) {
    return {
        type: types.sort.SET,
        payload: key
    };
}

export function setSortDir(key) {
    return {
        type: types.sort.SET_DIR,
        payload: key
    };
}

export function setNewSort(sortBy, sortDir) {
    return {
        type: types.sort.SET_SORT_USERS,
        payload: {
            sortBy,
            sortDir
        },
    };
}
