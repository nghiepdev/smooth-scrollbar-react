import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Fork from './Fork';
import Scrollbar from '../index';

import './styles.css';

ReactDOM.render(
  <React.Fragment>
    <Scrollbar>
      <div style={{ height: '100vh' }}>
        <App />
      </div>
    </Scrollbar>
    <Fork />
  </React.Fragment>,
  document.getElementById('app')
);
