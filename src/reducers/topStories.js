/** @format */

import { RECEIVE_GET_TOPSTORIES } from 'SRC/actions/index';

const initialState = {};

const story = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GET_TOPSTORIES: {
      const {
        payload: { raw: data },
      } = action;

      if (Array.isArray(data) && data.length) {
        return [...data];
      }

      return state;
    }
    default:
      return state;
  }
};

export default story;
