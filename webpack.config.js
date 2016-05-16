const NpmInstallPlugin = require('npm-install-webpack-plugin');

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = {
  // Entry accepts a path or an object of entries. We'll be using the
  //   latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  resolve: {
    // When trying to resolve a string filename to a file, Webpack will try
    //   adding each of these extensions to the string as it searches.  For
    //   instance, if you do `require('hello')`, Webpack will search for one
    //   of 'hello', 'hello.js', or 'hello.jsx' (earlier ones get precedence)
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // note: 'css' (css-loader) resolves `@import` and `url` statements in
        //   CSS files, and 'style' deals with `require` statements in JavaScript
        //   that require CSS files.
        // Include accepts either a path or an array of paths.
        include: PATHS.app,
      },
      {
        // Set up jsx. This accepts js too thanks to RegExp
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        //   It uses default OS directory by default. If you need something
        //   more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel'],
        // Parse only files in the app folder so that Babel doesn't look at all
        //   node_modules files
        include: PATHS.app,
      },
    ],
  },
};

// Default configuration. We will return this if
//   Webpack is called outside of npm.
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      devtool: 'eval-source-map',

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default localhost
      host: process.env.HOST,
      port: process.env.PORT,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true, // like `npm install foo --save`
      }),
    ],
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
  });
}
