/** @format */

import { combineReducers } from 'redux';
import topStories from './topStories';
import story from './story';
import comment from './comment';
import apiLoading from './apiLoading';

const rootReducer = () =>
  combineReducers({
    topStories,
    story,
    comment,
    apiLoading,
  });

export default rootReducer;
