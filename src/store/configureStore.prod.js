import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../reducers/root';
import thunk from "redux-thunk";

let store;
export default function configureStore(initialState) {
    if (store) {
        return store;
    }
    const createdStore = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk)
        )
    );
    store = createdStore;
    return store;
}
