import React, { Component } from 'react';
import i18next from 'i18next';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Tap from 'react-interactions'

import setUrlHistory from '../history';
import { setNewSort } from '../../actions/sort';

const setButtonClass = (key, value) => {
    return classNames(
        {'btn btn-blue':key==value},
        {'btn btn-primary':key!=value}
    );
}

class Sortpanel extends Component {
    constructor(props) {
        super(props);
    }
    sortBy(e, type) {
        e.preventDefault();
        const { sortDir } = this.props;
        let sortBy = type;
        this.props.setNewSortAction(sortBy, sortDir);
        setUrlHistory({name:'sort_by', value:sortBy});
    }
    sortDir(e, type) {
        e.preventDefault();
        const { sortBy } = this.props;
        let sortDir = type;
        this.props.setNewSortAction(sortBy, sortDir);
        setUrlHistory({name:'sort_dir', value:sortDir});
    }
    render() {
        const { sortBy, sortDir } = this.props;
        return (
            <div className="sortpanel">
                <div className="controls__header">
                    {i18next.t('sort')}
                </div>
                <div className="sortpanel__buttons">
                    <div className="sortpanel__button">
                        <button className={setButtonClass(sortBy, 'id')} onClick={(e) => this.sortBy(e, 'id')}>
                            ID
                            <Tap scale fade waves />
                        </button>
                    </div>
                    <div className="sortpanel__button">
                        <button className={setButtonClass(sortBy, 'name')} onClick={(e) => this.sortBy(e, 'name')}>
                            {i18next.t('sort_by_name')}
                            <Tap scale fade waves />
                        </button>
                    </div>
                    <div className="sortpanel__button">
                        <button className={setButtonClass(sortBy, 'age')} onClick={(e) => this.sortBy(e, 'age')}>
                            {i18next.t('sort_by_age')}
                            <Tap scale fade waves />
                        </button>
                    </div>
                </div>
                <div className="sortpanel__directions">
                    <div className="sortpanel__direction">
                        <button className={setButtonClass(sortDir, 'asc')} onClick={(e) => this.sortDir(e, 'asc')}>
                            {i18next.t('sort_dir_asc')}
                            <Tap scale fade waves />
                        </button>
                    </div>
                    <div className="sortpanel__direction">
                        <button className={setButtonClass(sortDir, 'desc')} onClick={(e) => this.sortDir(e, 'desc')}>
                            {i18next.t('sort_dir_desc')}
                            <Tap scale fade waves />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

export const mapStateToProps = state => {
    return {
        sortBy: state.sortBy,
        sortDir: state.sortDir,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNewSortAction: (sortBy, sortDir) => dispatch(setNewSort(sortBy, sortDir)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sortpanel);
