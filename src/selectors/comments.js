/** @format */

import { createSelector } from 'reselect';

export const getStateComments = (state) => state.comment;

export const getComments = createSelector(
  getStateComments,
  (obj) => ({ ...(obj || {}) }),
);
