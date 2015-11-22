module.exports = {
  options: {
    banner: '/*! <%= package.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  },
  vendor: {
    files: {
      'build/public/app/vendor.js': ['build/public/app/vendor.js']
    }
  },
  dist: {
    files: {
      'build/public/app/app.js': ['build/public/app/app.js']
    }
  }
};
