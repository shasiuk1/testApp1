/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import types from 'SRC/types';
import Loader from 'SRC/components/shared/LoaderBox';
import Comment from 'SRC/scenes/app/components/Story/components/Comment';

import styles from './index.scss';

const Comments = ({ loading, comments = [] }) => {
  if (loading) {
    return <Loader>Loading Comments..</Loader>;
  }

  return (
    <div styleName="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  comments: types.comments.isRequired,
  loading: PropTypes.bool,
};

Comments.defaultProps = {
  loading: true,
};

export default cssModules(Comments, styles);
