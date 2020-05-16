import { combineReducers } from 'redux';

import { lang } from './lang';
import { users } from './users';
import { view } from './view';
import { sortBy, sortDir } from './sort';

const rootReducer = combineReducers({
    lang,
    users,
    view,
    sortBy,
    sortDir
});

export default rootReducer;