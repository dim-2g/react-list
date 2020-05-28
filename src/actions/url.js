import * as types from '../constants/types';

export function setStateFromUrl(data) {
    return {
        type: types.url.INIT_FROM_URL,
        payload: data
    };
}
