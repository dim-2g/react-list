import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import i18next from 'i18next';
import { connect } from 'react-redux';
import 'react-interactions/dist/main.css';

import { itemsFetchData } from './actions/users';
import { setLang } from './actions/lang';
import { itemsFetchDataSuccess }  from './actions/users';
import { setTerm }  from './actions/term';
import { setSortBy, setSortDir }  from './actions/sort';
import { setView } from './actions/view';
import { setStateFromUrl } from './actions/url';

import Controls from './components/controls/controls';
import Langpanel from './components/controls/langpanel';
import UserList from './components/userlist/userlist';
import SearchBar from './components/searchbar/searchbar';
import setUrlHistory from './components/history';
import Loader from './components/Loader';
import * as ruLocale from './lang/ru.json';
import * as enLocale from './lang/en.json';


class App extends Component {
    constructor(props) {
        super(props);
        this.setLanguage = this.setLanguage.bind(this);
    }
    componentWillMount() {
        this.setLanguage(this.props.lang);
    }
    componentDidMount() {
        //обрабатываем адресную строку для инициализации нужного фильтра
        this.urlToProps();
        //подгружаем пользователей
        this.props.fetchDataAction('/data/data.json');
    }
    urlToProps = function() {
        const url = new URLSearchParams(window.location.search);
        let urlParams = {};
        url.forEach(function(value, key) {
            urlParams[key] = value;
        });
        this.props.setStateFromUrlAction(urlParams);
    };
    setLanguage(language) {
        let langResources = ruLocale;
        switch (language) {
            case 'en':
                langResources = enLocale;
        }
        i18next.init({
            lng: language,
            resources: langResources
        });
        this.props.setLangAction(language);
    }
    setTerm(term) {
        this.props.setTermAction(term);
        setUrlHistory({name:'term', value:term});
    }
    render() {
        const { lang, loading, term } = this.props;
        return (
            <div className="app">
                <div className="container">
                    <Langpanel lang={lang} changeLang={this.setLanguage} />
                    <Controls />
                    {loading
                        ? (<Loader />)
                        : (
                            <React.Fragment>
                                <SearchBar onChange={(term) => this.setTerm(term)} term={term}/>
                                <UserList />
                            </React.Fragment>
                        )}
                </div>
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
        lang: state.lang,
        term: state.term
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataAction: (url) => dispatch(itemsFetchData(url)),
        setLangAction: (lang) => dispatch(setLang(lang)),
        setViewAction: (view) => dispatch(setView(view)),
        updateUsers: (users) => dispatch(itemsFetchDataSuccess(users)),
        setTermAction: (term) => dispatch(setTerm(term)),
        setSortByAction: (key) => dispatch(setSortBy(key)),
        setSortDirAction: (key) => dispatch(setSortDir(key)),
        setStateFromUrlAction: (data) => dispatch(setStateFromUrl(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
