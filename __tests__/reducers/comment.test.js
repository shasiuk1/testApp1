/** @format */

import reducer from 'SRC/reducers/comment';
import * as actions from 'SRC/actions/index';

describe('comment reducer', () => {
  const initialState = {};
  const firstComment = {
    id: 1,
    by: 'First',
  };

  const firstCommentV2 = {
    id: 1,
    by: 'First Version 2',
  };

  const secondComment = {
    id: 2,
    by: 'Second',
  };

  let state = null;

  it('returns initial state', () => {
    state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('get 1st comment, test actions.RECEIVE_GET_COMMENT', () => {
    const receiveGetComment = {
      type: actions.RECEIVE_GET_COMMENT,
      payload: {
        data: { ...firstComment },
      },
    };

    state = reducer(state, receiveGetComment);
    expect(state).toEqual({
      1: { ...firstComment },
    });
  });

  it('get updated 1st comment, test actions.RECEIVE_GET_COMMENT', () => {
    const receiveGetComment = {
      type: actions.RECEIVE_GET_COMMENT,
      payload: {
        data: { ...firstCommentV2 },
      },
    };

    state = reducer(state, receiveGetComment);
    expect(state).toEqual({
      1: { ...firstCommentV2 },
    });
  });

  it('get 2st comment, test actions.RECEIVE_GET_COMMENT', () => {
    const receiveGetComment = {
      type: actions.RECEIVE_GET_COMMENT,
      payload: {
        data: { ...secondComment },
      },
    };

    state = reducer(state, receiveGetComment);
    expect(state).toEqual({
      1: { ...firstCommentV2 },
      2: { ...secondComment },
    });
  });

  it('return prev state when wrong/empty/falsy data received', () => {
    const receiveGetComment = {
      type: actions.RECEIVE_GET_COMMENT,
      payload: {
        data: 'wrong data',
      },
    };

    state = reducer(state, receiveGetComment);
    expect(state).toEqual({
      1: { ...firstCommentV2 },
      2: { ...secondComment },
    });
  });
});
