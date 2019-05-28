/** @format */

import { RECEIVE_GET_STORY } from 'SRC/actions/index';

const initialState = {};

const story = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GET_STORY: {
      const {
        payload: { data },
      } = action;
      if (data && data.id) {
        return Object.assign({}, state, { [data.id]: data });
      }

      return state;
    }
    default:
      return state;
  }
};

export default story;
