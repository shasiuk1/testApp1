/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import types from 'SRC/types';
import Spinner from 'SRC/components/shared/Spinner';

import styles from './index.scss';

const Loader = ({ children, style }) => (
  <div styleName="loader" style={style}>
    <div styleName="loader-icon">
      <Spinner />
    </div>

    <div>{children}</div>
  </div>
);

Loader.propTypes = {
  children: types.children,
  style: PropTypes.object,
};

Loader.defaultProps = {
  children: 'Please wait, loading..',
  style: {},
};

export default cssModules(Loader, styles);
