import React from 'react';
import classNames from 'classnames';
import i18next from 'i18next';

export const UserListTable = (props) => {
    const { user } = props;
    const { onToggleFavourite } = props;
    const userAvatar = `/static/images/${user.image}.svg`;
    const favouriteClass = classNames(
        'user-row__favourite',
        {'active':user.favourite}
    );
    
    return (
        <div className="user-row" key={user.id}>
            <div className="user-row__image">
                <img src={userAvatar} />
            </div>
            <div className="user-row__name">{user.name}</div>
            <div className="user-row__age">{user.age} {i18next.t('years_old')}</div>
            <div className="user-row__phone">{user.phone}</div>
            <div className={favouriteClass} onClick={() => onToggleFavourite(user.id)}><i className="fa fa-star"></i></div>
        </div>
)};

export default UserListTable;

