/** @format */

const config = {
  env: process.env.ENV,
  siteName: 'Test App',
  apiUrl: 'https://hacker-news.firebaseio.com/v0/',
};

const setConfig = (key, value) => {
  config[key] = value;
};

const getConfig = (key) => config[key];

export default config;
export { setConfig };
export { getConfig };
