/** @format */

import React from 'react';
import types from 'SRC/types';

const HtmlString = ({ children }) => (
  <span dangerouslySetInnerHTML={{ __html: children }} />
);

HtmlString.propTypes = {
  children: types.children,
};

HtmlString.defaultProps = {
  children: '',
};

export default HtmlString;
