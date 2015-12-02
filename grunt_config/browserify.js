module.exports = {
  options: {
    browserifyOptions: {
      paths: ['./src/server']
    },
    debug: false,
    external: [
      'angular',
      'angular-resource',
      'angular-sanitize',
      'angular-ui-bootstrap',
      'angular-ui-router',
      'bootstrap',
      'CBuffer',
      'jquery',
      'lodash',
      'mongoose',
      'socket.io-client',
      'ui-router-extras'
    ]
  },
  debug: {
    options: {
      debug: true,
    },
    files: {
      'build/public/app/app.js': ['src/public/app/app.js'],
    }
  },
  dist: {
    files: {
      'build/public/app/app.js': ['src/public/app/app.js'],
    }
  },
  vendor: {
    options: {
      alias: [
        'angular:',
        'angular-resource:',
        'angular-sanitize:',
        'angular-ui-bootstrap:',
        'angular-ui-router:',
        'bootstrap:',
        'CBuffer:',
        'jquery:',
        'lodash:',
        'mongoose:',
        'socket.io-client:',
        'ui-router-extras:'
      ],
      external: null
    },
    src: ['.'],
    dest: 'build/public/app/vendor.js',
  }
};
