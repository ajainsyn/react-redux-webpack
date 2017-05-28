const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



exports.devServer = ({ publicPath, host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    publicPath,
    hot: true,
    open: true,
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    quiet: false,
    overlay: {
      errors: true,
      warnings: true,
    },
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.HotModuleReplacement = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

exports.NamedModulesPlugin = () => ({
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
});

exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path], {
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
  ],
});

exports.uglifyJavaScript = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: 'babel-loader',
        options: {
          // Enable caching for improved performance during
          // development.
          // It uses default OS directory by default. If you need
          // something more custom, pass a path to it.
          // I.e., { cacheDirectory: '<path>' }
          cacheDirectory: true,
        },
      },
    ],
  },
});



exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});


exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ],
  };
};

exports.page = ({
  path = '',
  template = require.resolve(
    './index.html'
  ),
  title,
  entry,
  chunks,
  favicon,
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      chunks,
      filename: `${path && path + '/'}index.html`,
      template,
      title,
      favicon,
    }),
  ],
});