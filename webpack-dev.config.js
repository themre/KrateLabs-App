var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './app'),
  debug: true,
  devtool: 'source-map',
  entry: {
    jsx: './index.js',
    html: './index.html',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  node: {
    console: true,
    fs: 'empty'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg|)$/, loader: 'url-loader' },
      { test: /\.(html|ico|txt)$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader' }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  postLoaders: [
    {
      include: /node_modules\/mapbox-gl/,
      loader: 'transform',
      query: 'brfs'
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
      __DEV__: true
    })
  ]
}
