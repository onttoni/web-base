module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
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
            debug: true
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
    },

    clean: ['build'],

    copy: {
      fonts: {
        files: [{
          expand: true,
          src: ['node_modules/font-awesome/fonts/*'],
          dest: 'build/public/assets/fonts',
          flatten: true
        }],
      },
      images: {
        files: [{
          expand: true,
          src: ['node_modules/jquery-ui/themes/base/images/*'],
          dest: 'build/public/assets/images',
          flatten: true
        }]
      },
    },

    cssmin: {
      options: {
        root: 'assets/css',
        //rebase: true
      },
      combine: {
        files: {
          'build/public/assets/css/styles.css': [
            'src/public/assets/css/styles.css',
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
        w3clocal: 'http://w3c-validator.local/nu'
      },
      files: {
        src: ['src/public/app/**/*.html', 'src/public/app/**/*.html.tmpl']
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
    },

    jshint: {
      all: ['Gruntfile.js', 'src/public/app/**/*.js']
    },

    mkdir: {
      all: {
        options: {
          create: ['build/public']
        },
      },
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'build/public',
          src: ['**/*.js'],
          dest: 'build/public'
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
          cwd: 'build/public',
          src: ['**/*.js'],
          dest: 'build/public'
        }]
      }
    },

    watch: {
      files: [['src/public/**/*.html'], ['src/public/**/*.html.tmpl'], ['src/public/**/*.js'], ['src/public/**/*.css']],
      tasks: ['debug']
    }

  });

  // Load the needed plugins.
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
  grunt.registerTask('common', ['htmlangular', 'jshint', 'clean', 'mkdir', 'copy', 'cssmin']);
  grunt.registerTask('debug', ['common', 'browserify:debug', 'htmlmin:debug']);
  grunt.registerTask('dist', ['common', 'browserify:dist', 'ngAnnotate', 'uglify', 'htmlmin:dist']);

};
