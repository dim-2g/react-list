import React from 'react';
import classNames from 'classnames';
import i18next from 'i18next';

export const UserListTable = (props) => {
    const { user, delay } = props;
    const { onToggleFavourite } = props;
    const userAvatar = `/static/images/${user.image}.svg`;
    const favouriteClass = classNames({' active':user.favourite});
    //i18next.t('favourite_add')
    const favouriteTitle = user.favourite ? i18next.t('favourite_remove') : i18next.t('favourite_add');
    //console.log('trans', delay);
    let itemStyle = {};
    if (delay > 0) {
        itemStyle = {transitionDelay: `${delay}ms`};
    }
    return (
        <div className="userlist__item-row" style={itemStyle}>
            <div className="user-row">
                <div className="user-row__image">
                    <img src={userAvatar} />
                </div>
                <div className="user-row__name">{user.name}</div>
                <div className="user-row__age">{user.age} {i18next.t('years_old')}</div>
                <div className="user-row__phone">{user.phone}</div>
                <div className={`user-row__favourite${favouriteClass}`} onClick={() => onToggleFavourite(user.id)}><i className="fa fa-star" title={favouriteTitle}></i></div>
            </div>
        </div>
)};

export default UserListTable;

/*
style={{transitionDelay: `${delay}ms`}}
 */

