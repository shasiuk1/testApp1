/** @format */

import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import initStore from 'SRC/store';
import App from 'SRC/scenes/app';

const appContainer = document.getElementById('root');
const { store, history } = initStore();

const rootComponent = (
  <Provider store={store} history={history}>
    <App />
  </Provider>
);

render(rootComponent, appContainer);
