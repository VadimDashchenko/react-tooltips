import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import * as serviceWorker from './serviceWorker';
import './index.scss';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   </React.StrictMode>
,
  document.getElementById('root')
);

serviceWorker.unregister();
