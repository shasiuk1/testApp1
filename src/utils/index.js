/** @format */

// App utils

export const hasStr = (str, sub) => str.indexOf(sub) >= 0;

export const cutStr = (str, part) => str.replace(part, '');

export const getActionName = (action) => cutStr(action, 'REQUEST_');
