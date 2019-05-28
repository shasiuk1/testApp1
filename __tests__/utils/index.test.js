/** @format */

import * as utils from 'SRC/utils/index';

describe('test utils', () => {
  it('hasStr, returns true if str contains substring', () => {
    const testString = 'my test string';
    const result = utils.hasStr(testString, 'string');

    expect(result).toBeTruthy();
  });

  it('cutStr, returns cut string', () => {
    const testString = 'my_test_string';
    const result = utils.cutStr(testString, '_string');

    expect(result).toBe('my_test');
  });

  it('getActionName, returns action name correctly', () => {
    const MY_ACTION = 'REQUEST_GET_TEST';
    const result = utils.getActionName(MY_ACTION);

    expect(result).toBe('GET_TEST');
  });
});
