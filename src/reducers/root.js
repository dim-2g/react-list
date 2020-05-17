import { combineReducers } from 'redux';

import { lang } from './lang';
import { users } from './users';
import { view } from './view';
import { sortBy, sortDir } from './sort';
//import { usersVisual } from './usersvisual';
import { term } from './term';

const rootReducer = combineReducers({
    lang,
    users,
    //usersVisual,
    view,
    sortBy,
    sortDir,
    term
});

export default rootReducer;