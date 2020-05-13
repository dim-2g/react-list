import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from 'parse-link-header';
import orderBy from 'lodash/orderBy';
import uuid from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import i18next from 'i18next';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Controls from './components/controls/controls';
import Langpanel from './components/controls/langpanel';
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
        this.state = {
            error: null,
            loading: false,
            posts: [],
            endpoint: `${process.env
                .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
            workersEndpoint: '/data/data.json',
            users: [],
            stateOfIn: false,
            message : "",
            lang: "en",
            sortBy: "id",
            sortDir: "asc",
            viewType: 'table',
        };
        this.getPosts = this.getPosts.bind(this);
    }
    static propTypes = {
        children: PropTypes.node,
    };
    componentWillMount() {
        this.setLanguage('en');
    }
    componentDidMount() {
        this.getWorkers();
    }
    componentDidCatch(err, info) {
        console.error(err);
        console.error(info);
        this.setState(() => ({
            error: err,
        }));
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
        this.setState(() => ({lang: language}));
        //this.props.actions.changeLanguage(i18next);
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
        const { sortBy, sortDir, viewType, lang} = this.state;
        return (
            <div className="app">
                <div className="container">
                    <Langpanel lang={lang} />
                    <Controls />
                    <div>
                        <button onClick={this.setLanguage.bind(this, 'en')}>English</button>
                        <button onClick={this.setLanguage.bind(this, 'ru')}>Русский</button>
                    </div>
                    <div>{i18next.t('test_message')}</div>
                    <div>
                        <button className="btn" onClick={() => this.deleteUser()}>{i18next.t('delete')}</button>
                        <button className="btn" onClick={() => this.addUser()}>{i18next.t('add')}</button>
                    </div>
                    <TransitionGroup
                        className="todo-list"
                     >
                    {this.state.users.map( (item, index) => {
                        const delay = index * 50;
                        return (
                        <CSSTransition
                            key={item.id}
                            timeout={300}
                            classNames="item"
                        >
                            <div className="card" key={item.id}>
                                <div className="card-body justify-content-between">
                                    {item.name}
                                </div>
                            </div>
                        </CSSTransition>
                        )
                        })}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default App;
