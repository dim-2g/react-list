import React from 'react';
import classNames from 'classnames';
import i18next from 'i18next';
import ReactPlayer from 'react-player';
import { InView } from 'react-intersection-observer'

import VideoPlayer from './videopleer';

export const UserListPreview = (props) => {
    const { user } = props;
    const { onToggleFavourite } = props;
    const userAvatar = `/static/images/${user.image}.svg`;
    const favouriteClass = classNames(
        'user-preview__favourite',
        {'active':user.favourite}
    );
    const videoClass = user.video ? ' userlist__item--video' : '';
    return (
        <div className={`userlist__item${videoClass}`} key={user.id}>
            <div className="user-preview">
                <div className="user-preview__info">
                    <div className="user-preview__top">
                        <div className="user-preview__image">
                            <img src={userAvatar} />
                        </div>
                        <div className="user-preview__name">{user.name}</div>
                        <div className={favouriteClass} onClick={() => onToggleFavourite(user.id)}><i className="fa fa-star"></i></div>
                    </div>
                    <div className="user-preview__age">{user.age} {i18next.t('years_old')}</div>
                    <div className="user-preview__phone">{user.phone}</div>
                    <div className="user-preview__phrase">{user.phrase}</div>
                </div>
                {user.video &&
                    <div className="user-preview__video">
                        <VideoPlayer video={user.video} />
                    </div>
                }
            </div>
        </div>
)};

export default UserListPreview;

