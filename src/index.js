import React from 'react';
import { render } from 'react-dom';

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
console.log('store');
console.log(store.getState());
render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
