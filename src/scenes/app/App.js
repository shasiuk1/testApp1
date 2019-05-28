/** @format */

import React from 'react';
import cssModules from 'react-css-modules';
import TopStories from './components/TopStories';

import styles from './index.scss';

const App = () => (
  <div styleName="app">
    <div className="container">
      <h1 styleName="app-title">See Top Stories</h1>
      <TopStories />
    </div>
  </div>
);

App.propTypes = {};

App.defaultProps = {};

export default cssModules(App, styles);
