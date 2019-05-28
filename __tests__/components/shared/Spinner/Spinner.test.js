/** @format */

import { shallow } from 'enzyme/build';
import React from 'react';
import HtmlString from 'SRC/components/shared/HtmlString';
import toJson from 'enzyme-to-json';

const testString = `Test String with <p>html</p>`;

describe('test HtmlString', () => {
  it('component is defined', () => {
    const wrapper = shallow(<HtmlString />);
    expect(wrapper.find(HtmlString)).toBeDefined();
  });

  it('component matches snapshot', () => {
    const wrapper = shallow(<HtmlString>{testString}</HtmlString>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
