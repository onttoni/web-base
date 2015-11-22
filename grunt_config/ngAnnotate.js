module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'build/public',
      src: ['**/*.js'],
      dest: 'build/public'
    }]
  }
};
