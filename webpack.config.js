var SERVER = {
  host: 'localhost',
  port: 3000
};

var NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var src = path.join(__dirname, 'src');

module.exports = {
  entry: [
    './src/index.tsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    hot: true,
    host: SERVER.host,
    port: SERVER.port
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['react-hot-loader', 'ts-loader'],
      include: src
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=10000&name=./resources/[hash].[ext]',
    }]
  }
};

console.log('env: ' + NODE_ENV);
switch (NODE_ENV) {
  case 'production':
    module.exports.devtool = 'cheap-module-source-map';
    module.exports.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }));
    module.exports.plugins.unshift(new webpack.optimize.OccurrenceOrderPlugin());
    break;
  case 'development':
    module.exports.devtool = 'eval';
    module.exports.entry.unshift('webpack-dev-server/client?http://' + SERVER.host + ':' + SERVER.port);
    module.exports.entry.unshift('webpack/hot/only-dev-server');
    module.exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
    break;
  default:
    throw 'unknown env=' + NODE_ENV;
}
module.exports.plugins.unshift(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(NODE_ENV)
  }
}));
