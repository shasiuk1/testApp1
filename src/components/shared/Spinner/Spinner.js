/** @format */

import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.scss';

const Spinner = () => <div styleName="spinner" />;

Spinner.propTypes = {};

Spinner.defaultProps = {};

export default cssModules(Spinner, styles);
