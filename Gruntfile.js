module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bgShell: {
      _defaults: {
        bg: true
      },
      start_server: {
        cmd: 'npm start > /dev/null 2>&1'
      },
      stop_server: {
        cmd: "kill $(ps aux |grep node |grep http-server |tr -s ' ' |cut -d ' ' -f 2) > /dev/null 2>&1",
        bg: false
      }
    },

    browserify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['main.js'],
          dest: 'build/js',
          flatten: true
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
          cwd: 'src/js',
          src: ['main.js'],
          dest: 'build/js',
          flatten: true
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
          'build/css/styles.css': [
            'src/css/styles.css',
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/jquery-ui/themes/base/jquery-ui.css'
          ]
        }
      }
    },

    htmlangular: {
      options: {
        tmplext: 'html.tmpl',
        //w3clocal: 'http://w3c-validator.local/nu'
      },
      files: {
        src: ['src/views/**/*.html', 'src/views/**/*.html.tmpl']
      }
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
          src: ['views/**/*.html', 'views/**/*.html.tmpl'],
          dest: 'build'
        }]
      },
      debug: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['views/**/*.html', 'views/**/*.html.tmpl'],
          dest: 'build'
        }]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js']
    },

    mkdir: {
      all: {
        options: {
          create: ['build']
        },
      },
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: ['**/*.js'],
          dest: 'build/js'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'build/js',
          src: ['**/*.js'],
          dest: 'build/js'
        }]
      }
    },

    watch: {
      files: [['src/**/*.html'], ['src/**/*.js'], ['src/**/*.css']],
      tasks: ['debug']
    }

  });

  // Load the needed plugins.
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-angular-validate');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Task(s).
  grunt.registerTask('default', ['debug']);
  grunt.registerTask('common', ['bgShell:stop_server', 'htmlangular', 'jshint', 'clean', 'mkdir', 'copy', 'cssmin']);
  grunt.registerTask('debug', ['common', 'browserify:debug', 'htmlmin:debug', 'bgShell:start_server']);
  grunt.registerTask('dist', ['common', 'browserify:dist', 'ngAnnotate', 'uglify', 'htmlmin:dist', 'bgShell:start_server']);

};
