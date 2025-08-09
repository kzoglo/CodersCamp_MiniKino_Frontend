import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import App from './components/App/App';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.querySelector('#root'))

root.render(
  <Router>
    <App />
  </Router>,
);
