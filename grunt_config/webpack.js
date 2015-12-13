var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: {
    entry: {
      app: './src/public/app/app.js',
      about: './src/public/app/components/about/index.js',
      chat: './src/public/app/components/chat/index.js',
      home: './src/public/app/components/home/index.js',
      friends: './src/public/app/components/friends/index.js',
      user: './src/public/app/components/user/index.js',
      vendor: [
        'angular',
        'angular-ui-router',
        'bootstrap',
        'oclazyload',
        'ui-router-extras'
      ],
    },

    output: {
      path: './build/public/app/',
      filename: '[name].js',
      publicPath: '/app/'
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity})
    ],

    stats: false,

    progress: true,

    failOnError: false,

    watch: false,

    keepalive: false,

    inline: false,

    hot: false,

    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.target.mk$/,
          loader: 'raw-loader'
        },
        {
          test: /\.node$/,
          loader: 'node-loader'
        }
      ]
    },

    resolve: {
      root: [
        path.resolve(__dirname, '../src/public/app'),
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../src/server')
      ],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.node']
    },

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  },
};
