import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import orderBy from 'lodash/orderBy';
import uuid from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions/users';
import { setLang } from './actions/lang';
import { itemsFetchDataSuccess }  from './actions/users';
import { setTerm }  from './actions/term';
import { setSortBy, setSortDir }  from './actions/sort';
import { setView } from './actions/view';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Controls from './components/controls/controls';
import Langpanel from './components/controls/langpanel';
import UserList from './components/userlist/userlist';
import SearchBar from './components/searchbar/searchbar';
import Loader from './components/Loader';
import * as ruLocale from './lang/ru.json';
import * as enLocale from './lang/en.json';

import * as API from './shared/http';
import Post from './components/post/Post';

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
class App extends Component {
    constructor(props) {
        super(props);
    }
    
    static propTypes = {
        children: PropTypes.node,
    };
    componentWillMount() {
        this.setLanguage(this.props.lang);
    }
    componentDidMount() {
        //подгружаем пользователей
        this.props.fetchDataAction('/data/data.json');
        //обрабатываем адресную строку для инициализации нужного фильтра
        this.urlToProps();
    }
    
    componentDidCatch(err, info) {
        console.error(err);
        console.error(info);
        this.setState(() => ({
            error: err,
        }));
    }
    getUrlParam = function(name) {
        return new URLSearchParams(window.location.search).get(name);
    }
    urlToProps = function() {
        let sortBy = this.getUrlParam('sort_by');
        if (sortBy) {
            this.props.setSortByAction(sortBy);
        }
        let sortDir = this.getUrlParam('sort_dir');
        if (sortDir) {
            this.props.setSortDirAction(sortDir);
        }
        let term = this.getUrlParam('term');
        if (term) {
            this.props.setTermAction(term);
        }
        let view = this.getUrlParam('view');
        if (view) {
            this.props.setViewAction(view);
        }
    }
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

    getPosts() {
        return [];
    }
    getWorkers() {
        fetch(this.state.workersEndpoint)
            .then(response => response.json())
            .then(users => {
                this.setState(() => ({users: users}))
            })
            .catch(error => {
                this.setState(() => ({ error: error }));
            });
    }
    deleteUser() {
        let newUsers = [...this.state.users];
        console.log(newUsers);
        newUsers.splice(0, 1);
        this.setState(() => ({users: newUsers}));
    }
    addUser() {
        let user = {
            id: uuid(),
            name: "Димон",
            age: 34
        };
        let newUsers = [...this.state.users];
        newUsers.splice(0, 0, user);
        console.log(newUsers);
        this.setState(() => ({users: newUsers}));
    }
    render() {
        const { lang, setTermAction } = this.props;
        return (
            <div className="app">
                <div className="container">
                    <Langpanel lang={lang} changeLang={this.setLanguage.bind(this)} />
                    <Controls />
                    <SearchBar onChange={setTermAction} />
                    <UserList />
                </div>
            </div>
        );
    }
}
/*
<TransitionGroup
className="todo-list"
>
....
</TransitionGroup>
*/

export const mapStateToProps = state => {
    //console.log('state');
    //console.log(state);
    return {
        error: state.error,
        loading: state.loading,
        users: state.users,
        //users: state.users,
        sortBy: state.sortBy,
        lang: state.lang
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
        setViewAction: (view) => dispatch(setView(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
