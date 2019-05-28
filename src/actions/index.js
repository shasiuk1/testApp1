/** @format */

import { API_CALL } from 'SRC/middleware/api';

export const REQUEST_GET_TOPSTORIES = 'REQUEST_GET_TOPSTORIES';
export const RECEIVE_GET_TOPSTORIES = 'RECEIVE_GET_TOPSTORIES';
export const FAIL_GET_TOPSTORIES = 'FAIL_GET_TOPSTORIES';
function getTopStories() {
  return {
    [API_CALL]: {
      types: [
        REQUEST_GET_TOPSTORIES,
        RECEIVE_GET_TOPSTORIES,
        FAIL_GET_TOPSTORIES,
      ],
      endpoint: 'topstories.json',
    },
  };
}

export const REQUEST_GET_STORY = 'REQUEST_GET_STORY';
export const RECEIVE_GET_STORY = 'RECEIVE_GET_STORY';
export const FAIL_GET_STORY = 'FAIL_GET_STORY';
function getStory(id) {
  return {
    [API_CALL]: {
      types: [REQUEST_GET_STORY, RECEIVE_GET_STORY, FAIL_GET_STORY],
      endpoint: `item/${id}.json`,
    },
  };
}

export const REQUEST_GET_COMMENT = 'REQUEST_GET_COMMENT';
export const RECEIVE_GET_COMMENT = 'RECEIVE_GET_COMMENT';
export const FAIL_GET_COMMENT = 'FAIL_GET_COMMENT';
function getComment(id) {
  return {
    [API_CALL]: {
      types: [REQUEST_GET_COMMENT, RECEIVE_GET_COMMENT, FAIL_GET_COMMENT],
      endpoint: `item/${id}.json`,
    },
  };
}

export default {
  getTopStories,
  getStory,
  getComment,
};
