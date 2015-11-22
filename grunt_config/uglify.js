module.exports = {
  dist: {
    options: {
      banner: '/*! <%= package.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    files: [{
      expand: true,
      cwd: 'build/public',
      src: ['**/*.js'],
      dest: 'build/public'
    }]
  }
};
