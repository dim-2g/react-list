import React from 'react';
import { connect } from 'react-redux';

import Sortpanel from './sortpanel';
import Viewpanel from './viewpanel';
import { setView } from '../../actions/view';
import { setSortBy, setSortDir }  from '../../actions/sort';
import { initVisibleUsers } from "../../actions/users";

export const Controls = (props) => {
    const { view, lang } = props;
    const { setViewAction, reinitVisibleUsersAction } = props;
    return (
    <div className="controls">
        <div className="controls__grid">
            <div className="controls__sort">
                <Sortpanel />
            </div>
            <div className="controls__view">
                <Viewpanel lang={lang} view={view} setView={setViewAction} reinitVisibleUsers={reinitVisibleUsersAction}/>
            </div>
        </div>
    </div>
)};

export const mapStateToProps = state => {
    return {
        error: state.error,
        loading: state.loading,
        users: state.users,
        sortBy: state.sortBy,
        sortDir: state.sortDir,
        view: state.view,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setViewAction: (view) => dispatch(setView(view)),
        setSortByAction: (key) => dispatch(setSortBy(key)),
        setSortDirAction: (key) => dispatch(setSortDir(key)),
        reinitVisibleUsersAction: () => dispatch(initVisibleUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
