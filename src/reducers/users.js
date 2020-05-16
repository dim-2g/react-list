import initialState from "../constants/initialState";
import * as types from '../constants/types';

export function users(state = initialState.users, action) {
    switch (action.type) {
        case types.users.ITEMS_FETCH_DATA_SUCCESS:
            return action.users;
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