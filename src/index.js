import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import App from './app';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
// NOTE: this isn't ES*-compliant/possible, but works because we use Webpack as a build tool
import './styles/styles.scss';

const store = configureStore(initialReduxState);

const routes = (
    <Route path="/" component={App}>
        <Route path="*" component={App} />
    </Route>
);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
