import { combineReducers } from 'redux';

import { lang } from './lang';
import { users } from './users';
import { view } from './view';
import { sortBy, sortDir } from './sort';
//import { usersVisual } from './usersvisual';
import { term } from './term';
import { visibleElements, lastVisible, lazyUsers } from './visibleusers';
import { canAllVideoPlaying, nowPlayVideo } from './playingvideo';
import { loading } from './loading';
import { scrollEndPage } from './scrollendpage';

const rootReducer = combineReducers({
    lang,
    users,
    view,
    sortBy,
    sortDir,
    term,
    visibleElements,
    lastVisible,
    canAllVideoPlaying,
    nowPlayVideo,
    loading,
    lazyUsers,
    scrollEndPage,
});

export default rootReducer;
