import '@assets/reset.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@app/App';
import config from '@app/aws-exports';
import Amplify from '@aws-amplify/core';

Amplify.configure(config);

ReactDOM.render(<App />, document.getElementById('app'));
