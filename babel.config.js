/** @format */

const presets = [
  ['@babel/preset-react'],
  [
    '@babel/env',
    {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7'],
      },
    },
  ],
];

const plugins = [
  '@babel/plugin-transform-react-display-name',
  '@babel/plugin-proposal-class-properties',
  'react-hot-loader/babel',
];

module.exports = { presets, plugins };
