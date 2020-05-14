import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function view(state = initialState.view, action) {
    switch (action.type) {
        case types.view.SET:
            return action.view;
        default:
            return state;
    }
}