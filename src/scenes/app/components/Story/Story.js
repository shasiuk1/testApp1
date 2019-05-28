/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import types from 'SRC/types';
import CommentsList from './components/CommentsList';

import styles from './index.scss';

class Story extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoadingComments: false,
    };

    this.handleOpenComments = this.handleOpenComments.bind(this);
    this.handleFetchComments = this.handleFetchComments.bind(this);
  }

  handleOpenComments() {
    const { isOpen, isLoadingComments } = this.state;

    // Prevent fetching if it's already in process
    // or if comment section is going to be closed
    if (!isLoadingComments && !isOpen) {
      this.handleFetchComments();
    }

    this.setState((prev) => ({ isOpen: !prev.isOpen }));
    return isOpen;
  }

  handleFetchComments() {
    this.setState(() => ({ isLoadingComments: true }));

    this.props
      .onFetchComments()
      .then(() => this.setState(() => ({ isLoadingComments: false })));
  }

  render() {
    const { story } = this.props;
    const { isOpen } = this.state;

    return (
      <div styleName="story">
        <div styleName="story-head">
          <div styleName="story-head-start">
            <div styleName="story-title">
              <div styleName="story-title-text">{story.title}</div>
              <small styleName="story-title-by">
                by: <b>{story.by}</b>
              </small>
            </div>
            <div styleName="story-score">Score: {story.score}</div>
          </div>

          <div styleName="story-head-end">
            <a styleName="toggle-comments" onClick={this.handleOpenComments}>
              {isOpen && <span>Close</span>}
              {!isOpen && <span>Open</span>} comments
            </a>
          </div>
        </div>

        {isOpen && (
          <div styleName="story-body">
            <CommentsList
              comments={this.props.comments}
              loading={this.state.isLoadingComments}
            />
          </div>
        )}
      </div>
    );
  }
}

Story.propTypes = {
  story: types.story.isRequired,
  comments: types.comments,
  onFetchComments: PropTypes.func,
};

Story.defaultProps = {
  comments: [],
  onFetchComments: () => null,
};

export default cssModules(Story, styles);
