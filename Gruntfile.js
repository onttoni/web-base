module.exports = function(grunt) {

  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt_config'),
    loadGruntTasks: {
      pattern: 'grunt-*',
      config: require('./package.json'),
      scope: 'devDependencies'
    },
  });

  grunt.registerTask('default', ['debug']);
  grunt.registerTask('libs', ['clean', 'mkdir', 'browserify:vendor', 'uglify:vendor']);
  grunt.registerTask('common', ['htmlangular', 'jshint', 'copy', 'cssmin']);
  grunt.registerTask('debug', ['common', 'webpack:debug', 'htmlmin:debug']);
  grunt.registerTask('dist', ['common', 'webpack', 'ngAnnotate', 'uglify:dist', 'htmlmin:dist']);

};
