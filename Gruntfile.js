module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'build'
        }]
      },
      debug: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'build'
        }]
      }
    },

    clean: ['build'],

    copy: {
      fonts: {
        files: [{
          expand: true,
          src: ['node_modules/font-awesome/fonts/*'],
          dest: 'build/fonts',
          flatten: true
        }],
      },
      images: {
        files: [{
          expand: true,
          src: ['node_modules/jquery-ui/themes/base/images/*'],
          dest: 'build/images',
          flatten: true
        }]
      },
    },

    cssmin: {
      options: {
        root: '/'
      },
      combine: {
        files: {
          'build/styles.css': [
            'src/css/styles.css',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/jquery-ui/themes/base/jquery-ui.css'
          ]
        }
      }
    },

    htmllint: {
      options: {
        force: true,
        htmllintrc: true
      },
      src: ['src/**/*.html']
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html'],
          dest: 'build'
        }]
      },
      debug: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.html'],
          dest: 'build'
        }]
      }
    },

    mkdir: {
      all: {
        options: {
          create: ['build']
        },
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/main.js',
        dest: 'build/main.js'
      }
    },

    watch: {
      files: [['src/**/*.html'], ['src/**/*.js'], ['src/**/*.css']],
      tasks: ['debug']
    }

  });

  // Load the needed plugins.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmllint');
  grunt.loadNpmTasks('grunt-mkdir');

  // Task(s).
  grunt.registerTask('default', ['debug']);
  grunt.registerTask('common', ['htmllint', 'clean', 'mkdir', 'copy', 'cssmin']);
  grunt.registerTask('debug', ['common', 'browserify:debug', 'htmlmin:debug']);
  grunt.registerTask('dist', ['common', 'browserify:dist', 'uglify', 'htmlmin:dist']);

};
