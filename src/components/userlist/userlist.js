import React, { Component } from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';

import { toggleFavourite }  from '../../actions/users';
import UserListTable from './userlisttable';
import UserListPreview from './userlistpreview';

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
    render() {
        const { users, view, term } = this.props;
        const { toggleFavouriteAction } = this.props;
        const filteredUsers = this.filter(users, term);
        return (
            <div className="userlist">
                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map(user => {
                    if (view == 'table') {
                        return (<UserListTable user={user} onToggleFavourite={toggleFavouriteAction} key={user.id} />);
                    }
                    if (view == 'preview') {
                        return (<UserListPreview user={user} onToggleFavourite={toggleFavouriteAction} key={user.id} />);
                    }
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
        term: state.term
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);