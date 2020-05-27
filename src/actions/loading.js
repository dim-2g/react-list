import * as types from '../constants/types';

export function itemsIsLoading(status) {
    return {
        type: types.loading.SET,
        payload: status
    };
}
