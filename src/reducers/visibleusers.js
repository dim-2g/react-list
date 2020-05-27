import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function visibleElements(state = initialState.visibleElements, action) {
    switch (action.type) {
        case types.users.VISIBLE_COUNT:
            return state + action.payload;
        case types.users.INIT_VISIBLE_COUNT:
            return initialState.visibleElements;
        case types.users.SET_NEXT:
            return state + action.incrementVisibleUsers;
        default:
            return state;
    }
}

export function lastVisible(state = initialState.lastVisible, action) {
    switch (action.type) {
        case types.users.LAST_VISIBLE_COUNT:
            return action.payload;
        case types.users.SET_NEXT:
            return action.lastVisibleUsers;
        default:
            return state;
    }
}
