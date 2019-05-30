/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { COMMENTS_MAX } from 'SRC/constants';
import actions from 'SRC/actions';
import selectors from 'SRC/selectors';
import Story from './Story';

// cut array of ids to match max comments amount
const getCutCommentsIds = (ids) =>
  (ids || []).length < COMMENTS_MAX ? [...ids] : ids.slice(0, COMMENTS_MAX);

const mapStateToProps = (state, props) => {
  const storyId = props.story.id;

  return {
    story: selectors.stories.getStory(state, { storyId }),
    comments: selectors.stories.getStoryCommentsArray(state, { storyId }),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onFetchComments: async () => {
    const { story = {} } = props;

    const comments = getCutCommentsIds(story.kids);
    return Promise.all(comments.map((id) => dispatch(actions.getComment(id))));
  },
});

class StoryContainer extends Component {
  render() {
    return <Story {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryContainer);
