/** @format */

import { RECEIVE_GET_COMMENT } from 'SRC/actions/index';

const initialState = {};

const comment = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GET_COMMENT: {
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

export default comment;
