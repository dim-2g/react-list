import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { toggleFavourite, setVisibleUsers, setLastVisibleUsers, setTrackedHeight, nextUsers }  from '../../actions/users';
import { itemsIsLoading } from '../../actions/loading';
import Item from './item';


//let lastVisible = 0;
class Userlist extends Component {
    constructor(props) {
        super(props);
    }
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
        const { loading, users, visibleElements, animatingList } = this.props;
        if (!users || users.length == 0) return;
        if (loading) return;
        if (visibleElements >= users.length) return;
        this.props.nextUsersAction(10, visibleElements);
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
                    //уникальный ключ, учитывающий порядок вывода и какой элемент там был
                    let userKey = `${user.id}-${index}-${view}`;
                    return (<Item view={view} user={user} toggleFavouriteAction={toggleFavouriteAction} delay={delay} key={userKey} />);
            })}
            <Waypoint
                onEnter={() => this.handleWaypointEnter()}
                bottomOffset={'-50px'}
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
    trackedHeight: state.trackedHeight,
    animatingList: state.animatingList,
};
};

const mapDispatchToProps = (dispatch) => {
return {
    toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId)),
    setVisibleUsersAction: (count) => dispatch(setVisibleUsers(count)),
    setLastVisibleUsersAction:  (count) => dispatch(setLastVisibleUsers(count)),
    setTrackedHeightAction: (count) => dispatch(setTrackedHeight(count)),
    nextUsersAction: (incrementVisibleUsers, lastVisibleUsers) => dispatch(nextUsers(incrementVisibleUsers, lastVisibleUsers)),
    itemsIsLoadingAvtion: (result) => dispatch(itemsIsLoading(result)),
    animatingListAction: (result) =>  dispatch(animatingList(result)),
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
