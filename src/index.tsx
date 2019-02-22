import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import * as serviceWorker from './serviceWorker';
import configureStore from './config/store';

import Main from './pages/index';
import './index.css';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
