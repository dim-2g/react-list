import React from 'react';
import { connect } from 'react-redux';

import Sortpanel from './sortpanel';
import Viewpanel from './viewpanel';
import { setView } from '../../actions/view';

export const Controls = (props) => {
    const { view, lang } = props;
    const { setViewAction } = props;
    return (
    <div className="controls">
        <div className="controls__grid">
            <div className="controls__sort">
                <Sortpanel lang={lang}/>
            </div>
            <div className="controls__view">
                <Viewpanel lang={lang} view={view} setView={setViewAction} />
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
        view: state.view,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setViewAction: (view) => dispatch(setView(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);