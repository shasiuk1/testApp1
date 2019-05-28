/** @format */

import { pick } from 'lodash';
import { createSelector } from 'reselect';
import { getComments } from './comments';

export const getTopStories = (state) => [...state.topStories];
export const getStateStories = (state) => state.story;

export const getStories = createSelector(
  getStateStories,
  (obj) => ({ ...(obj || {}) }),
);

export const getStoriesArray = createSelector(
  getStories,
  (stories) =>
    Object.values(stories).sort((a, b) => (a.score > b.score ? -1 : 1)),
);

export const getStoryId = (state, props = {}) => {
  return parseInt(props.storyId, 10) || null;
};

export const getStory = createSelector(
  getStories,
  getStoryId,
  (stories, id) => (stories && stories[id]) || null,
);

export const getStoryCommentsIds = createSelector(
  getStory,
  (story) => (story && story.kids) || [],
);

export const getStoryCommentsArray = createSelector(
  getStoryCommentsIds,
  getComments,
  (ids, comments) =>
    Object.values(pick(comments, ids)).sort((a, b) =>
      a.time > b.time ? -1 : 1,
    ),
);
