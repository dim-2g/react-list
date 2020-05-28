import * as types from '../constants/types';
import { itemsIsLoading } from '../actions/loading';
import { sort } from '../utils/sort';

export function itemsFetchDataSuccess(users) {
    return {
        type: types.users.ITEMS_FETCH_DATA_SUCCESS,
        users
    };
}

export function toggleFavourite(userId) {
    return {
        type: types.users.TOGGLE_FAVOURITE,
        userId
    };
}

export function setVisibleUsers(count) {
    return {
        type: types.users.VISIBLE_COUNT,
        payload: count
    };
}

export function initVisibleUsers() {
    return {
        type: types.users.INIT_VISIBLE_COUNT,
    };
}

export function setLastVisibleUsers(count) {
    return {
        type: types.users.LAST_VISIBLE_COUNT,
        payload: count
    };
}

export function nextUsers(incrementVisibleUsers, lastVisibleUsers) {
    return {
        type: types.users.SET_NEXT,
        incrementVisibleUsers,
        lastVisibleUsers
    };
}

export function setLazyUsers(result) {
    return {
        type: types.users.LAZY,
        payload: result
    };
}

export function itemsFetchData(url) {
    return (dispatch, getState) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                const { sortBy, sortDir } = getState();
                items = sort(items, sortBy, sortDir);
                dispatch(itemsFetchDataSuccess(items))
            })
            .catch(() => console.log('error')/*dispatch(itemsHasErrored(true))*/);
    };
}
