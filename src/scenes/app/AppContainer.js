/** @format */

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import 'SRC/styles/index.global.scss';
import App from 'SRC/scenes/app/App';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

class AppContainer extends Component {
  render() {
    return <App {...this.props} />;
  }
}

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppContainer),
);
