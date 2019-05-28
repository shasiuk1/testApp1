/** @format */

import { createSelector } from 'reselect';

export const getStateLoading = (state) => state.apiLoading;

export const getLoading = createSelector(
  getStateLoading,
  (i) => ({ ...(i || {}) }),
);

export const makeLoadingSelector = (actions = []) =>
  createSelector(
    [getLoading],
    (apiCalls) => actions.some((action) => !!apiCalls[action]),
  );
