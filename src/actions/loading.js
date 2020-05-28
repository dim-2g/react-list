import * as types from '../constants/types';

export function itemsIsLoading(status) {
    return {
        type: types.loading.SET,
        payload: status
    };
}

export function scrollEndPage(status) {
    return {
        type: types.loading.SCROLL_END_PAGE,
        payload: status
    };
}
