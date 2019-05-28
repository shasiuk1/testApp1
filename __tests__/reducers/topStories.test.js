/** @format */

import reducer from 'SRC/reducers/topStories';
import * as actions from 'SRC/actions/index';

describe('topStories reducer', () => {
  const initialState = [];
  let state = null;

  it('returns initial state', () => {
    state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('test actions.RECEIVE_GET_TOPSTORIES', () => {
    const testData = [1, 2, 3];
    const receiveGetTopstories = {
      type: actions.RECEIVE_GET_TOPSTORIES,
      payload: {
        raw: [...testData],
      },
    };

    state = reducer(state, receiveGetTopstories);
    expect(state).toEqual(testData);
  });

  it('actions.RECEIVE_GET_TOPSTORIES with bad data returns previous state', () => {
    const badData = { 1: 1, 2: 2 };
    const receiveGetTopstories = {
      type: actions.RECEIVE_GET_TOPSTORIES,
      payload: {
        raw: badData,
      },
    };

    state = reducer(state, receiveGetTopstories);
    expect(state).toEqual(state);
  });
});
