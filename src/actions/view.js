import * as types from '../constants/types';

export function setView(view) {
    return {
        type: types.view.SET,
        view
    };
}