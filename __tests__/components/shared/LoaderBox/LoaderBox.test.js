/** @format */

import { shallow } from 'enzyme/build';
import React from 'react';
import LoaderBox from 'SRC/components/shared/LoaderBox';
import toJson from 'enzyme-to-json';

describe('test LoaderBox', () => {
  it('component is defined', () => {
    const wrapper = shallow(<LoaderBox />);
    expect(wrapper.find(LoaderBox)).toBeDefined();
  });

  it('component matches snapshot', () => {
    const wrapper = shallow(<LoaderBox />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('component has 1 processing icon', () => {
    const wrapper = shallow(<LoaderBox />);
    const icon = wrapper.find('.loader-icon');
    expect(icon.length).toBe(1);
  });
});
