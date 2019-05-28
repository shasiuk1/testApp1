/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions, {
  REQUEST_GET_TOPSTORIES,
  REQUEST_GET_STORY,
} from 'SRC/actions';
import { STORIES_MAX } from 'SRC/constants';
import { getActionName } from 'SRC/utils';
import types from 'SRC/types';
import selectors from 'SRC/selectors';
import LoaderBox from 'SRC/components/shared/LoaderBox';
import TopStories from './TopStories';

const mapStateToProps = (state) => {
  const loadingStories = selectors.loading.makeLoadingSelector([
    getActionName(REQUEST_GET_TOPSTORIES),
    getActionName(REQUEST_GET_STORY),
  ]);

  return {
    stories: selectors.stories.getStoriesArray(state),
    isLoadingStories: loadingStories(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchStories: async (amount = STORIES_MAX) => {
    const allIds = await dispatch(actions.getTopStories());

    if (allIds.error) {
      return null;
    }

    const ids = Object.values(allIds.payload.data).slice(0, amount);
    return Promise.all(ids.map((id) => dispatch(actions.getStory(id))));
  },
});

class TopStoriesContainer extends Component {
  static propTypes = {
    fetchStories: PropTypes.func,
    stories: types.stories,
    isLoadingStories: PropTypes.bool,
  };

  static defaultProps = {
    fetchStories: () => null,
    stories: [],
    isLoadingStories: true,
  };

  componentDidMount() {
    this.props.fetchStories();
  }

  render() {
    if (this.props.isLoadingStories) {
      return <LoaderBox />;
    }

    return <TopStories stories={this.props.stories} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopStoriesContainer);
