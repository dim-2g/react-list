import * as types from '../constants/types';

export function setLang(lang) {
    return {
        type: types.lang.SET,
        lang
    };
}