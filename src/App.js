import React, {Component} from 'react';
import './App.css';

import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import MainLayout from './components/MainLayout';

import {Provider} from 'react-redux'
import {createStore} from 'redux';
import rootReducer from './reducers/index'
const store = createStore(rootReducer);



export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route component={MainLayout} path="/"/>
          </Switch>
        </Router>
      </Provider>

    );
  }
}

export  {App};
