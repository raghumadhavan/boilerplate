const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js',
    vendor: [
      'axios',
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
    ],
  },

  resolve: {
    modules: ['node_modules', 'src'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-2'] },
      },
      {
        test: /\.s?css$/,
        use: [{loader: MiniCssExtractPlugin.loader} , {loader: 'css-loader', options: { minimize: true }} , {loader: 'resolve-url-loader'} , { loader: 'sass-loader?sourceMap'} ],
      },
      { test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/i, loader: 'file-loader?name=img/[name].[ext]' },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
  },

  devServer: {
    port: 8080,
    contentBase: './dist',
    // Host for testing in VM
    allowedHosts: ['10.0.2.2'],
    proxy: {
      //Put here the Server URL
      /*
        '/Api': {
          target: 'http://localhost:8081/',
        },
       */
    },
  },
    optimization : {
    splitChunks: {
      cacheGroups: {
        vendors:{
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin('dist'),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.png', to: 'assets/' },
      { from: 'build/locales', to: 'locales/' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Code splitting
    new MiniCssExtractPlugin('bundle.[hash].css'),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Watch translation files
    new WebpackShellPlugin({ onBuildStart: ['node scripts/i18n-scanner --watch'] }),
    new WorkboxPlugin({
      // swSrc: 'src/sw.js',
      swDest: 'dist/service-worker.js',
      globDirectory: 'src/',
      // staticFileGlobs: [
      //   'index.html',
      // ],
      globPatterns: ['**/*.{html,js,css}'],
      globIgnores: ['**/*.spec.js'],
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
