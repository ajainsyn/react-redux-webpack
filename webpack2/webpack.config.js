const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const parts = require('./config/webpack.config.parts');

process.noDeprecation = true;

const PATHS = {
  publicPath: '/',
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  hotApp: path.join(__dirname, './config/hotReload'),
};


const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: PATHS.publicPath,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ 
    include: PATHS.app,
    exclude: /node_modules/,
  }),
]);


// Production configuration
const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
    recordsPath: path.join(__dirname, 'records.json'),
  },
  parts.clean(PATHS.build),
  parts.uglifyJavaScript(),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);


// Development configuration
const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-source-map' }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    publicPath: PATHS.publicPath,
  }),
  parts.HotModuleReplacement(),
  parts.NamedModulesPlugin(),
]);



// Exort webpack configuration
module.exports = (env) => {
  console.log('========Starting webpack server ======' + env);
  process.env.BABEL_ENV = env;

  const pages = [
    parts.page({
      title: 'Webpack demo',
      entry: {
        app: env === 'production' ? 
          PATHS.app : ['react-hot-loader/patch', PATHS.app],
      },
      favicon: '',
      chunks: ['app', 'manifest', 'vendor'],
    }),
  ];
  const config = env === 'production' ?
    productionConfig :
    developmentConfig;

  return merge([commonConfig, config].concat(pages));
};