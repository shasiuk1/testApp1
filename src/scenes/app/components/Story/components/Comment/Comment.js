/** @format */

import React from 'react';
import cssModules from 'react-css-modules';
import types from 'SRC/types';
import HtmlString from 'SRC/components/shared/HtmlString';

import styles from './index.scss';

const Comment = ({ comment }) => (
  <div styleName="comment">
    <div styleName="comment-author">
      {comment.by} <small>wrote:</small>
    </div>
    <div styleName="comment-body">
      <HtmlString>{comment.text}</HtmlString>
    </div>
  </div>
);

Comment.propTypes = {
  comment: types.comment.isRequired,
};

Comment.defaultProps = {};

export default cssModules(Comment, styles);
