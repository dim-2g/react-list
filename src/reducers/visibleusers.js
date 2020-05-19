import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function visibleElements(state = initialState.visibleElements, action) {
    switch (action.type) {
        case types.users.VISIBLE_COUNT:
            return state + action.payload;
        default:
            return state;
    }
}
