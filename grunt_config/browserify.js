module.exports = {
  dist: {
    options: {
      browserifyOptions: {
        paths: ['./src/server']
      }
    },
    files: [{
      expand: true,
      cwd: 'src/public/app',
      src: ['app.js'],
      dest: 'build/public/app',
      flatten: true
    }]
  },
  debug: {
    options: {
      browserifyOptions: {
        debug: true,
        paths: ['./src/server']
      }
    },
    files: [{
      expand: true,
      cwd: 'src/public/app',
      src: ['app.js'],
      dest: 'build/public/app',
      flatten: true
    }]
  }
};
