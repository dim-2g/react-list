import * as types from '../constants/types';

export function setTerm(term) {
    return {
        type: types.term.SET,
        term
    };
}