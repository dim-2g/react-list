import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function nowPlayVideo(state = initialState.nowPlayVideo, action) {
    switch (action.type) {
        case types.video.NOW:
            return action.payload;
        //сбрасываем активное видео, чтобы оно позволло проигруваться другому
        case types.sort.SET_SORT_USERS:
            return null;
        default:
            return state;
    }
}

export function canAllVideoPlaying(state = initialState.canAllVideoPlaying, action) {
    switch (action.type) {
        case types.video.SET:
            return action.payload;
        default:
            return state;
    }
}
