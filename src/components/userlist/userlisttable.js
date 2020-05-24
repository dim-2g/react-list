import React, { Component } from 'react';
import classNames from 'classnames';
import i18next from 'i18next';

export const UserListTable = (props) => {
    const { user, delay, animationClass } = props;
    const { onToggleFavourite } = props;
    const userAvatar = `/static/images/${user.image}.svg`;
    const favouriteClass = classNames({' active':user.favourite});
    //i18next.t('favourite_add')
    const favouriteTitle = user.favourite ? i18next.t('favourite_remove') : i18next.t('favourite_add');
    return (
        <div className={`userlist__item-row ${animationClass}`}>
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

/*
class UserListTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            animationClass: 'enter'
        }
    }
    componentDidMount() {
        const { delay } = this.props;
        this.setState({
            animationClass: 'enter'
        });
        setTimeout(() => {
            this.setState({
                animationClass: 'enter-active',
            })
        }, delay);
        setTimeout(() => {
            console.log('Delete attr transition');
            this.setState({
                animationClass: '',
            })
        }, delay + 1400);
    }
    render() {
        const { needTransition, animationClass } = this.state;
        const {user, delay} = this.props;
        const {onToggleFavourite} = this.props;
        const userAvatar = `/static/images/${user.image}.svg`;
        const favouriteClass = classNames({' active': user.favourite});
        const favouriteTitle = user.favourite ? i18next.t('favourite_remove') : i18next.t('favourite_add');
        return (
            <div className={`userlist__item-row ${animationClass}`}>
                <div className="user-row">
                    <div className="user-row__image">
                        <img src={userAvatar}/>
                    </div>
                    <div className="user-row__name">{user.name}.</div>
                    <div className="user-row__age">{user.age} {i18next.t('years_old')}</div>
                    <div className="user-row__phone">{user.phone}</div>
                    <div className={`user-row__favourite${favouriteClass}`} onClick={() => onToggleFavourite(user.id)}>
                        <i className="fa fa-star" title={favouriteTitle}></i></div>
                </div>
            </div>
        )
    }
};
*/

export default UserListTable;

/*
style={{transitionDelay: `${delay}ms`}}
 */

