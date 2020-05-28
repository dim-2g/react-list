import initialState from "../constants/initialState";
import * as types from '../constants/types';
import { sort } from '../utils/sort';

export function users(state = initialState.users, action) {
    switch (action.type) {
        case types.users.ITEMS_FETCH_DATA_SUCCESS:
            return action.users;
        case types.sort.SET_SORT_USERS:
            return sort(state, action.payload.sortBy, action.payload.sortDir);
        case types.url.INIT_FROM_URL:
            return sort(state, action.payload.sort_by, action.payload.sort_dir);
        case types.users.TOGGLE_FAVOURITE:
            console.log('reducer user favourite');
            const newState = [].slice.call(state).map(item => {
                if (item.id == action.userId) {
                    item.favourite = !item.favourite;
                }
                return item;
            })
            return newState;
        default:
            return state;
    }
}
