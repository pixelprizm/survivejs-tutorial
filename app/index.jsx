import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';

import alt from './libs/alt';
import App from './components/App.jsx';
import persist from './libs/persist';
import storage from './libs/storage';

// Bootstrap and set up persistent app state
persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));
