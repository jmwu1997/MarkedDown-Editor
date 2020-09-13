import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import setAuthorizationToken from './utils/setAuthorizationToken';
// import {createStore} from 'redux';
// import allReducer from './reducers';
// import {Provider} from 'react-redux';

// const store = createStore(allReducer);
// setAuthorizationToken(localStorage.token);

ReactDOM.render(
    // <Provider store={store}>
        <App />
    // </Provider>
    , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
