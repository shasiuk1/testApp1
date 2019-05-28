/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'build');
const PUBLIC_DIR = path.resolve(SRC_DIR, 'public');
const PORT = process.env.PORT || 3000;
const DEBUG = process.env.DEBUG !== 'false' || true;
const GLOBALS = {
  'process.env.BROWSER': true,
  'process.env.NODE_ENV': JSON.stringify(
    process.env.NODE_ENV || (DEBUG ? 'development' : 'production'),
  ),
  __DEV__: DEBUG,
};

// format and output build variables for easier debugging
const envTable = Object.entries(GLOBALS)
  .reduce(
    (carry, [key, value]) => ({
      ...carry,
      [key]: JSON.parse(value),
    }),
    {},
  );
console.table(envTable);

module.exports = {
  entry: {
    main: path.resolve(SRC_DIR, 'client.js'),
  },
  output: {
    path: BUILD_DIR,
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
    publicPath: '/',
  },
  mode: DEBUG ? 'development' : 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: BUILD_DIR,
    port: PORT,
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
        },
      },
    },
    runtimeChunk: true,
  },
  resolve: {
    alias: {
      SRC: SRC_DIR,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'node_modules/react-routing/src'),
          path.resolve(__dirname, 'node_modules/query-string'),
          path.resolve(__dirname, 'node_modules/strict-uri-encode'),
          SRC_DIR,
        ],
        use: ['babel-loader', 'eslint-loader?emitWarning=1'],
      },
      {
        test: /\.css$/,
        use: [
          DEBUG ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
          `css-loader?modules&importLoaders=true&localIdentName=` +
            `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.global\.scss$/,
        use: [
          DEBUG ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
          `css-loader?${DEBUG ? 'sourceMap&' : ''}localIdentName=` +
            `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap&outputStyle=expanded',
        ],
      },
      {
        test: /^((?!\.global).)*scss$/,
        use: [
          DEBUG ? 'style-loader?sourceMap' : MiniCssExtractPlugin.loader,
          `css-loader?${DEBUG ? 'sourceMap&' : ''}modules&localIdentName=` +
            `${DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}`,
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap&outputStyle=expanded',
        ],
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: DEBUG ? '[name].css?[hash]' : '[name].[hash].css',
      chunkFilename: DEBUG ? '[id].css?[hash]' : '[id].[hash].css',
    }),
    new CleanWebpackPlugin(BUILD_DIR),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'public/index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ ...GLOBALS }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: PUBLIC_DIR, to: BUILD_DIR }]),
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:5000/)
        // through BrowserSync
        proxy: `http://localhost:${PORT}/`,
        // don't open any browser by default
        open: false,
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      },
    ),
  ],
};
