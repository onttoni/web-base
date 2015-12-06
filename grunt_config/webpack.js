var path = require('path');

module.exports = {
  debug: {
    // webpack options
    entry: './src/public/app/app.js',
    output: {
      path: './build/public/app/',
      filename: 'app.js',
    },

    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true
    },
    // stats: false disables the stats output

    storeStatsTo: 'xyz', // writes the status to a variable named xyz
    // you may use it later in grunt i.e. <%= xyz.hash %>

    progress: false, // Don't show progress
    // Defaults to true

    failOnError: false,

    watch: false,

    keepalive: false,

    inline: false,  // embed the webpack-dev-server runtime into the bundle
    // Defaults to false

    hot: true, // adds the HotModuleReplacementPlugin and switch the server to hot mode
    // Use this in combination with the inline option

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

// module.exports = {
//   options: {
//     browserifyOptions: {
//       paths: ['./src/server']
//     },
//     debug: false,
//     external: [
//       'angular',
//       'angular-resource',
//       'angular-sanitize',
//       'angular-ui-bootstrap',
//       'angular-ui-router',
//       'bootstrap',
//       'CBuffer',
//       'jquery',
//       'lodash',
//       'mongoose',
//       'socket.io-client',
//       'ui-router-extras'
//     ]
//   },
//   debug: {
//     options: {
//       debug: true,
//     },
//     files: {
//       'build/public/app/app.js': ['src/public/app/app.js'],
//     }
//   },
//   dist: {
//     files: {
//       'build/public/app/app.js': ['src/public/app/app.js'],
//     }
//   },
//   vendor: {
//     options: {
//       alias: [
//         'angular:',
//         'angular-resource:',
//         'angular-sanitize:',
//         'angular-ui-bootstrap:',
//         'angular-ui-router:',
//         'bootstrap:',
//         'CBuffer:',
//         'jquery:',
//         'lodash:',
//         'mongoose:',
//         'socket.io-client:',
//         'ui-router-extras:'
//       ],
//       external: null
//     },
//     src: ['.'],
//     dest: 'build/public/app/vendor.js',
//   }
// };
