import * as types from '../constants/types';

export function itemsFetchDataSuccess(users) {
    console.log('action creater');
    console.log(users);
    return {
        type: types.users.ITEMS_FETCH_DATA_SUCCESS,
        users
    };
}

export function itemsFetchData(url) {
    console.log('action itemsFetchData');
    return (dispatch) => {
        //dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                //dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => console.log('error')/*dispatch(itemsHasErrored(true))*/);
    };
}