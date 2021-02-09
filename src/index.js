/*
    This file handles that the app is placed inside the index.html
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {CssBaseline} from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import Data from './hooks/Data'
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import RootReducer from './reducers/RootReducer';
import thunk from 'redux-thunk';
import localStorageOperations from './hooks/LocalStorageOperations';


const {SW_INIT, SW_UPDATE} = Data();
const {saveState, loadState} = localStorageOperations();
const persistedState = loadState();

const store = createStore(RootReducer, persistedState,
    applyMiddleware(thunk));

    //The localstorage save, every time the state changes it's saved in local storage.
store.subscribe(() => {
    saveState({
        WidgetReducer : store.getState().WidgetReducer,
        NewsReducer : store.getState().NewsReducer,
        MsalReducer: store.getState().MsalReducer
    });
});

ReactDOM.render(
    // Provider makes redux store available to any nested component
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


serviceWorker.register({
    onSuccess: () => store.dispatch({type: SW_INIT}),
    onUpdate: registration => store.dispatch(
        {type: SW_UPDATE, payload: registration}),
});
