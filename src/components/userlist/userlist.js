import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { toggleFavourite, setVisibleUsers, setLastVisibleUsers, setTrackedHeight }  from '../../actions/users';
import UserListTable from './userlisttable';
import UserListPreview from './userlistpreview';
import Item from './item';

const Row = ({view, user, toggleFavouriteAction, delay}) => {
    if (view == 'table') {
        return (<UserListTable user={user} onToggleFavourite={toggleFavouriteAction} delay={delay}/>)
    }
    if (view == 'preview') {
        return (<UserListPreview user={user} onToggleFavourite={toggleFavouriteAction}  delay={delay}/>)
    }
};

let lastVisible = 0;
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
    handleScroll() {
        const { trackedHeight } = this.props;
        let marginVisible = 200;
        //если прокрутка близка к низу страницы
        if (this.needLoadMoreElements(trackedHeight, marginVisible)) {
            this.props.setTrackedHeightAction(window.scrollY + marginVisible);
            lastVisible = this.props.visibleElements;
            //подгрузим еще 15 элементов
            this.props.setVisibleUsersAction(15);
        }
    }
    //если прокрутка находится на marginVisible px от низа страницы, то вернет true
    needLoadMoreElements(trackedHeight, marginVisible) {
        let pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let startTrackingHeight = window.scrollY + marginVisible;
        return (startTrackingHeight > pageHeight && startTrackingHeight > trackedHeight);
    }
    componentDidMount() {
        window.addEventListener('scroll', () => this.handleScroll(), true);
    }
    render() {
        const { users, view, term, visibleElements } = this.props;
        const { toggleFavouriteAction } = this.props;
        const filteredUsers = this.filter(users, term).slice(0, visibleElements);
        //счетчик анимированных элементов, так как будем пропускать те, которые были анимированы
        let indexTransition = 1;
        return (
            <div>
                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map((user, index) => {
                    //не добавляем задержку анимации уже анимированным элементам
                    if (index > lastVisible) {
                        indexTransition++;
                    }
                    let delay = indexTransition * 200;
                    //вновь добавляемым при прокрутке элементам, задержку будем расчитывать снова сначала
                    if (index == lastVisible) {
                        indexTransition = 1;
                    }
                    //уникальный ключ, учитывающий порядок вывода и какой элемент там был
                    let userKey = `${user.id}-${index}`;
                    return (<Item view={view} user={user} toggleFavouriteAction={toggleFavouriteAction} delay={delay} key={userKey} />);
            })}
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
    trackedHeight: state.trackedHeight
};
};

const mapDispatchToProps = (dispatch) => {
return {
    toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId)),
    setVisibleUsersAction: (count) => dispatch(setVisibleUsers(count)),
    setLastVisibleUsersAction:  (count) => dispatch(setLastVisibleUsers(count)),
    setTrackedHeightAction: (count) => dispatch(setTrackedHeight(count)),
};
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
