import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function usersVisual(state = initialState.usersVisual, action) {
    switch (action.type) {
        case types.users.USERS_VISUAL:
            return action.users;
        default:
            return state;
    }
}