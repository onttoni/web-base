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

  // Task(s).
  grunt.registerTask('default', ['debug']);
  grunt.registerTask('common', ['htmlangular', 'jshint', 'clean', 'mkdir', 'copy', 'cssmin']);
  grunt.registerTask('debug', ['common', 'browserify:debug', 'htmlmin:debug']);
  grunt.registerTask('dist', ['common', 'browserify:dist', 'ngAnnotate', 'uglify', 'htmlmin:dist']);

};
