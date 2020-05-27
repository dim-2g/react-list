import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case types.loading.SET:
            return action.payload;
        default:
            return state;
    }
}
