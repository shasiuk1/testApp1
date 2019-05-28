/** @format */

import React from 'react';
import cssModules from 'react-css-modules';
import types from 'SRC/types';
import Story from 'SRC/scenes/app/components/Story';

import styles from './index.scss';

const TopStories = ({ stories }) => (
  <div styleName="stories">
    {stories.map((story) => (
      <Story key={story.id} story={story} />
    ))}
  </div>
);

TopStories.propTypes = {
  stories: types.stories.isRequired,
};

TopStories.defaultProps = {};

export default cssModules(TopStories, styles);
