import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function scrollEndPage(state = initialState.scrollEndPage, action) {
    switch (action.type) {
        case types.loading.SCROLL_END_PAGE:
            return action.payload;
        case types.loading.LOAD_USERS:
            return false;
        default:
            return state;
    }
}
