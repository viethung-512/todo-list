import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../utils/theme';

import HomePage from '../../pages/HomePage';
import store from '../redux/store';

function App() {
  console.log('todo app');
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
