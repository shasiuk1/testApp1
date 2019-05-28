/** @format */

import { shallow } from 'enzyme/build';
import React from 'react';
import Spinner from 'SRC/components/shared/Spinner';
import toJson from 'enzyme-to-json';

describe('test Spinner', () => {
  it('component is defined', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(Spinner)).toBeDefined();
  });

  it('component matches snapshot', () => {
    const wrapper = shallow(<Spinner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
