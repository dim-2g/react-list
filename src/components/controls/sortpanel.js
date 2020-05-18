import React, { Component } from 'react';
import i18next from 'i18next';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setView } from '../../actions/view';
import { setSortBy, setSortDir }  from '../../actions/sort';
import { itemsFetchDataSuccess }  from '../../actions/users';
import setUrlHistory from '../history';

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
        const { setSortByAction, setSortUsers } = this.props;
        const { users, sortDir } = this.props;
        let sortBy = type;

        const sorted = this.sort(users, sortBy, sortDir);
        setSortUsers(sorted);
        setSortByAction(sortBy);
        setUrlHistory({name:'sort_by', value:sortBy});
    }
    sortDir(e, type) {
        e.preventDefault();
        const { setSortDirAction, setSortUsers } = this.props;
        const { users, sortBy } = this.props;
        let sortDir = type;

        const sorted = this.sort(users, sortBy, sortDir);
        setSortUsers(sorted);
        setSortDirAction(sortDir);
        setUrlHistory({name:'sort_dir', value:sortDir});
    }
    sort(users, sortBy, sortDir) {
        const { setSortUsers } = this.props;
        let direction = (sortDir == 'asc') ? 1 : -1;
        const sorted = [].slice.call(users).sort((a, b) => {
            if (a[sortBy] === b[sortBy]) { return 0; }
            return a[sortBy] > b[sortBy] ? direction : direction * -1;
        });
        return sorted;
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
                        <a href="#" className={setButtonClass(sortBy, 'id')} onClick={(e) => this.sortBy(e, 'id')}>ID</a>
                    </div>
                    <div className="sortpanel__button">
                        <a href="#" className={setButtonClass(sortBy, 'name')} onClick={(e) => this.sortBy(e, 'name')}>{i18next.t('sort_by_name')}</a>
                    </div>
                    <div className="sortpanel__button">
                        <a href="#" className={setButtonClass(sortBy, 'age')} onClick={(e) => this.sortBy(e, 'age')}>{i18next.t('sort_by_age')}</a>
                    </div>
                </div>
                <div className="sortpanel__directions">
                    <div className="sortpanel__direction">
                        <a href="#" className={setButtonClass(sortDir, 'asc')} onClick={(e) => this.sortDir(e, 'asc')}>{i18next.t('sort_dir_asc')}</a>
                    </div>
                    <div className="sortpanel__direction">
                        <a href="#" className={setButtonClass(sortDir, 'desc')} onClick={(e) => this.sortDir(e, 'desc')}>{i18next.t('sort_dir_desc')}</a>
                    </div>
                </div>
            </div>
        )
    }
};

export const mapStateToProps = state => {
    return {
        error: state.error,
        loading: state.loading,
        users: state.users,
        sortBy: state.sortBy,
        sortDir: state.sortDir,
        lang: state.lang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSortByAction: (key) => dispatch(setSortBy(key)),
        setSortDirAction: (key) => dispatch(setSortDir(key)),
        setSortUsers: (users) => dispatch(itemsFetchDataSuccess(users))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sortpanel);