/** @format */

import { hasStr } from 'SRC/utils';

const apiLoading = (state = {}, action) => {
  const { type } = action;

  if (hasStr(type, 'REQUEST_')) {
    const key = type.replace('REQUEST_', '');
    const value = (state[key] || 0) + 1;
    return Object.assign({}, state, { [key]: value });
  }

  if (hasStr(type, 'RECEIVE_')) {
    const key = type.replace('RECEIVE_', '');
    const value = (state[key] || 1) - 1;
    return Object.assign({}, state, { [key]: value });
  }

  if (hasStr(type, 'FAIL_')) {
    const key = type.replace('FAIL_', '');
    const value = (state[key] || 1) - 1;
    return Object.assign({}, state, { [key]: value });
  }

  return state;
};

export default apiLoading;
