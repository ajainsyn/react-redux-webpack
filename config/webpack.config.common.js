const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


process.noDeprecation = true
const SRC_PATH = path.join(__dirname, '../src');

const cleanDist = new CleanWebpackPlugin(['dist', 'build'], {
  root: path.resolve(__dirname, '../'),
  verbose: true,
  dry: false
});

const HtmlPlugin =  new HtmlWebpackPlugin({
  title: 'Getting Started - React Redux',
  template: '../config/index.html',
  favicon: '../src/assets/images/favicon.ico',
  inject: true
});

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: [
      '../src'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [SRC_PATH, 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module:{
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ["env", {"modules": false}],
                "react",
                "stage-0"
                // Transpile React components to JavaScript
              ],
              plugins: ['react-hot-loader/babel', 'react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/, //load css || load scss
        use: ['style-loader','css-loader','sass-loader']
      }, {
        test: /\.(png|jpe?g|gif|ico)$/, //load images
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 10000
            }
          },
          'img-loader'
        ]
      }, {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.woff2$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2'
        }
      }, {
        test: /\.(svg|eot|ttf|otf)$/, //load fonts
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]',
          limit: 10000
        }
      }, {
        test: /\.(webm|mp4)$/, //load videos file
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          limit: 10000
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    cleanDist,
    HtmlPlugin,
    new ExtractTextPlugin({
      filename: "[name].[hash].css",
      allChunks: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new CopyWebpackPlugin([
      { 
        from: '../src/resources/data/*.json',
        to: '[path][name].[ext]'
      }
    ])
  ]
};
