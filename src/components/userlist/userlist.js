import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { toggleFavourite, setVisibleUsers, setLastVisibleUsers }  from '../../actions/users';
import UserListTable from './userlisttable';
import UserListPreview from './userlistpreview';

const Row = ({view, user, toggleFavouriteAction, delay}) => {
    if (view == 'table') {
        return (<UserListTable user={user} onToggleFavourite={toggleFavouriteAction} delay={delay}/>)
    }
    if (view == 'preview') {
        return (<UserListPreview user={user} onToggleFavourite={toggleFavouriteAction} />)
    }
};

let lastVisible = 0;
class Userlist extends Component {
    constructor(props) {
        super(props);
    }
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
    trackedHeight = 0;
    handleScroll() {
        let marginVisible = 200;
        let pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let startTrackingHeight = window.scrollY + marginVisible;
        if (startTrackingHeight > pageHeight && startTrackingHeight > this.trackedHeight) {
            this.trackedHeight = window.scrollY + marginVisible;
            lastVisible = this.props.visibleElements;
            this.props.setVisibleUsersAction(10);
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', () => this.handleScroll(), true);
        lastVisible = this.props.lastVisible;
    }
    render() {
        const { users, view, term, visibleElements } = this.props;
        const { toggleFavouriteAction } = this.props;
        const filteredUsers = this.filter(users, term).slice(0, visibleElements);
        console.clear();
        let indexTransition = 1;
        return (
            <div>
                <TransitionGroup className="userlist">
                    {filteredUsers && filteredUsers.length > 0 && filteredUsers.map((user, index) => {
                        if (index > lastVisible) {
                            indexTransition++;
                        }

                        let delay = indexTransition * 100;
                        /*
                        if (index == lastVisible) {
                            indexTransition = 1;
                        }
*/
                            delay = 0;
                        console.log('index', index);
                        console.log('visibleElements', visibleElements);
                        console.log('indexTransition', indexTransition);
                        console.log('lastVisible', lastVisible);
                        console.log(delay);
  //                      delay = 500;
                        //let cssClass = index < 20 ? 'userlist-item--visible' : 'userlist-item--hidden';
                        return (
                            <CSSTransition
                                key={user.id}
                                className={'userlist-item'}
                                timeout={0}
                            >
                                <Row view={view} user={user} toggleFavouriteAction={toggleFavouriteAction} delay={delay} />
                            </CSSTransition>
                        )}
                    )}
                </TransitionGroup>

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
        visibleElements: state.visibleElements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId)),
        setVisibleUsersAction: (count) => dispatch(setVisibleUsers(count)),
        setLastVisibleUsersAction:  (count) => dispatch(setLastVisibleUsers(count)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);

/*
style={{transitionDelay: `${delay}ms`}}
 */

/*
<TransitionGroup className="userlist">
                    {filteredUsers && filteredUsers.length > 0 && filteredUsers.map((user, index) => {
                        let delay = index * 1000;
                        console.log(delay);
                        //let cssClass = index < 20 ? 'userlist-item--visible' : 'userlist-item--hidden';
                        return (
                        <CSSTransition
                            key={user.id}
                            className={'userlist-item'}
                            timeout={800}
                        >
                            <Row view={view} user={user} toggleFavouriteAction={toggleFavouriteAction} delay={delay} />
                        </CSSTransition>
                        )}
                    )}
                </TransitionGroup>
 */

/*

 */
