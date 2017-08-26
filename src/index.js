import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const routes = (
  <BrowserRouter forceRefresh={false}>
    <App />
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
