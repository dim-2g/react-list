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
    render() {
        const { users, view } = this.props;
        const { toggleFavouriteAction } = this.props;
        return (
            <div className="userlist">
                {users && users.length && users.map(user => {
                    if (view == 'table') {
                        return <UserListTable user={user} onToggleFavourite={toggleFavouriteAction} key={user.id} />
                    }
                    if (view == 'preview') {
                        return <UserListPreview user={user} onToggleFavourite={toggleFavouriteAction} key={user.id} />
                    }
                })}
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
        view: state.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFavouriteAction: (userId) => dispatch(toggleFavourite(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);