import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { toggleFavourite, setVisibleUsers }  from '../../actions/users';
import UserListTable from './userlisttable';
import UserListPreview from './userlistpreview';

const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        Row {index}
    </div>
);

let itemStatusMap = {};
const isItemLoaded = index => !!itemStatusMap[index];
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
            this.props.setVisibleUsersAction(5);
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', () => this.handleScroll(), true);
    }
    render() {
        const { users, view, term, visibleElements } = this.props;
        console.log('render', visibleElements);
        const { toggleFavouriteAction } = this.props;
        const filteredUsers = this.filter(users, term).slice(0, visibleElements);
        return (
            <div>
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
                            <div >
                                {view == 'table' &&
                                <UserListTable user={user} onToggleFavourite={toggleFavouriteAction} />
                                }
                                {view == 'preview' &&
                                <UserListPreview user={user} onToggleFavourite={toggleFavouriteAction} />
                                }
                            </div>
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
        setVisibleUsersAction: (count) => dispatch(setVisibleUsers(count))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);

/*
style={{transitionDelay: `${delay}ms`}}
 */
