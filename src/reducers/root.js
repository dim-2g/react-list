import { combineReducers } from 'redux';

import { lang } from './lang';
import { users } from './users';
import { view } from './view';

const rootReducer = combineReducers({
    lang,
    users,
    view
});

export default rootReducer;