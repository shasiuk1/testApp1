/** @format */

import reducer from 'SRC/reducers/story';
import * as actions from 'SRC/actions/index';

describe('comment reducer', () => {
  const initialState = {};
  const firstStory = {
    id: 1,
    title: 'First Story',
  };

  const firstStoryV2 = {
    id: 1,
    title: 'First Story Version 2',
  };

  const secondStory = {
    id: 2,
    title: 'Second Story',
  };

  let state = null;

  it('returns initial state', () => {
    state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('get first story, test actions.RECEIVE_GET_STORY', () => {
    const receiveGetStory = {
      type: actions.RECEIVE_GET_STORY,
      payload: {
        data: { ...firstStory },
      },
    };

    state = reducer(state, receiveGetStory);
    expect(state).toEqual({
      1: { ...firstStory },
    });
  });

  it('get updated first story, test actions.RECEIVE_GET_STORY', () => {
    const receiveGetStory = {
      type: actions.RECEIVE_GET_STORY,
      payload: {
        data: { ...firstStoryV2 },
      },
    };

    state = reducer(state, receiveGetStory);
    expect(state).toEqual({
      1: { ...firstStoryV2 },
    });
  });

  it('get second story, test actions.RECEIVE_GET_STORY', () => {
    const receiveGetStory = {
      type: actions.RECEIVE_GET_STORY,
      payload: {
        data: { ...secondStory },
      },
    };

    state = reducer(state, receiveGetStory);
    expect(state).toEqual({
      1: { ...firstStoryV2 },
      2: { ...secondStory },
    });
  });

  it('return prev state when wrong/empty/falsy data received', () => {
    const receiveGetStory = {
      type: actions.RECEIVE_GET_STORY,
      payload: {
        data: 'wrong data',
      },
    };

    state = reducer(state, receiveGetStory);
    expect(state).toEqual({
      1: { ...firstStoryV2 },
      2: { ...secondStory },
    });
  });
});
