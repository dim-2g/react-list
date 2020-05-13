import React from 'react';
import { render } from 'react-dom';

import App2 from './app';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
// NOTE: this isn't ES*-compliant/possible, but works because we use Webpack as a build tool
import './styles/styles.scss';

render(<App2 />, document.getElementById('app'));
