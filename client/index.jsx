import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import App from './components/App.jsx';

const socket = io();

ReactDOM.render(
  <App socket={socket} />,
  document.getElementById('app')
);
