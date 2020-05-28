import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';

import {
    toggleFavourite,
    setVisibleUsers,
    setLastVisibleUsers,
    nextUsers,
    setLazyUsers }  from '../../actions/users';
import { scrollEndPage } from '../../actions/loading';
import Item from './item';

class Userlist extends Component {
    //поиск имени и фамилии среди элементов, учитывает разный порядок следования
    filter(users, term) {
        let filteredUsers = users.slice();
        if (term) {
            const searchPhrases = term.split(" ");
            filteredUsers = filteredUsers.filter(user => {
                let normalizeName = user.name.toLowerCase().trim();
                let includeAllPhrases = true;
                searchPhrases.forEach(name => {
                    if (normalizeName.indexOf(name) == -1) {
                        includeAllPhrases = false;
                    }
                });
                if (includeAllPhrases) {
                    return user;
                }
            });
        }
        return filteredUsers;
    }
    handleWaypointEnter() {
        if (!this.props.users || this.props.users.length == 0) return;
        if (this.props.visibleElements >= this.props.users.length) return;
        this.props.scrollEndPageAction(true);
        if (!this.props.lazyUsers) {
            this.loadMore();
        }
    }
    handleWaypointLeave() {
        this.props.scrollEndPageAction(false);
    }
    loadMore() {
        this.props.setLazyUsersAction(true);
        this.props.nextUsersAction(15, this.props.visibleElements);
    }
    setLastLoading() {
        this.props.setLazyUsersAction(false);
        if (this.props.scrollEndPage) {
            this.loadMore();
        }
    }
    render() {
        const { users, view, term, visibleElements, lastVisible } = this.props;
        const { toggleFavouriteAction } = this.props;
        const filteredUsers = this.filter(users, term).slice(0, visibleElements);
        //счетчик анимированных элементов, так как будем пропускать те, которые были анимированы
        let indexTransition = 0;
        return (
            <div className="userlist">
                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map((user, index) => {
                    //не добавляем задержку анимации уже анимированным элементам
                    if (index > lastVisible) {
                        indexTransition++;
                    }
                    let delay = indexTransition * 100;
                    //вновь добавляемым при прокрутке элементам, задержку будем расчитывать снова сначала
                    if (index == lastVisible) {
                        indexTransition = 1;
                    }
                    //console.log('delay: ', delay);
                    let isLast = filteredUsers.length == index + 1;
                    //уникальный ключ, учитывающий порядок вывода и какой элемент там был
                    let userKey = `${user.id}-${index}-${view}`;
                    return <Item
                        view={view}
                        user={user}
                        toggleFavouriteAction={toggleFavouriteAction}
                        delay={delay}
                        key={userKey}
                        isLast={isLast}
                        onLast={() => this.setLastLoading()}
                    />
            })}
            <Waypoint
                onEnter={() => this.handleWaypointEnter()}
                onLeave={() => this.handleWaypointLeave()}
                bottomOffset={'-100px'}
            />
            {term && filteredUsers.length == 0 &&
                <div className="userlist__no-result">
                    {i18next.t('search_no_result')}
                </div>
            }
        </div>
    );
}
}

export const mapStateToProps = state => {
    return {
        error: state.error,
        loading: state.loading,
        users: state.users,
        sortBy: state.sortBy,
        sortDir: state.sortBy,
        lang: state.lang,
        view: state.view,
        term: state.term,
        visibleElements: state.visibleElements,
        lastVisible: state.lastVisible,
        scrollEndPage: state.scrollEndPage,
        lazyUsers: state.lazyUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId)),
        setVisibleUsersAction: (count) => dispatch(setVisibleUsers(count)),
        setLastVisibleUsersAction:  (count) => dispatch(setLastVisibleUsers(count)),
        nextUsersAction: (incrementVisibleUsers, lastVisibleUsers) => dispatch(nextUsers(incrementVisibleUsers, lastVisibleUsers)),
        setLazyUsersAction: (result) => dispatch(setLazyUsers(result)),
        scrollEndPageAction: (result) => dispatch(scrollEndPage(result)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
