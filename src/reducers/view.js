import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function view(state = initialState.view, action) {
    switch (action.type) {
        case types.view.SET:
            return action.view;
        case types.url.INIT_FROM_URL:
            if (action.payload.view) {
                return action.payload.view;
            } else {
                return state;
            }
        default:
            return state;
    }
}
