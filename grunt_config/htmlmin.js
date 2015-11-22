module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      removeComments: true
    },
    files: [{
      expand: true,
      cwd: 'src',
      src: ['public/app/**/*.html', 'public/app/**/*.html.tmpl'],
      dest: 'build'
    }]
  },
  debug: {
    files: [{
      expand: true,
      cwd: 'src',
      src: ['public/app/**/*.html', 'public/app/**/*.html.tmpl'],
      dest: 'build'
    }]
  }
};
