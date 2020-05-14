import initialState from "../constants/initialState";
import * as types from '../constants/types';

export function users(state = initialState.users, action) {
    switch (action.type) {
        case types.users.ITEMS_FETCH_DATA_SUCCESS:
            return action.users;
        default:
            return state;
    }
}