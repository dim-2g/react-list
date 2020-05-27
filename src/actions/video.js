import * as types from '../constants/types';

export function playVideo(result) {
    return {
        type: types.video.SET,
        payload: result
    };
}

export function setNowVideoPlay(id) {
    return {
        type: types.video.NOW,
        payload: id,
    };
}
