module.exports = function(grunt) {

    var projectRootSrc = '/home/simon/WebstormProjects/homemade/';

    require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      uglify: {
        my_target: {
            options: {
                compress: {
                    drop_console: true
                }
            },
          files: {
              'client/app/output.min.js': ['client/app/**/*.js', '!client/app/output.min.js']
          }
        }
      },

      express: {
        dev: {
          options: {
              script: 'server/Server.js'
            // script: '/home/ubuntu/workspace/server/Server.js'
          }
        }
      },

      nodemon: {
          dev: {
              script: 'server/Server.js',

              options: {
                   nodeArgs: ['--debug=3009'],
              }

          }
      },

      jshint: {
          all: ['Gruntfile.js', 'client/app/**/*.js', 'server/**/*.js', '!client/app/output.min.js']
      },

      exec: {
          echo_something: 'lite-server',
      },

      concurrent: {
          target: {
              tasks: ['nodemon', 'exec'],
              options: {
                  logConcurrentOutput: true
              }
          }
      }

  });

  // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-concurrent');
  
    grunt.registerTask('ugl', ['uglify']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['uglify', 'nodemon']);
    grunt.registerTask('mon', ['nodemon']);
    grunt.registerTask('exp', ['express']);
    grunt.registerTask('dev', ['nodemon', 'exec']);
    grunt.registerTask('exe', ['exec']);

    grunt.registerTask('default', ['concurrent:target']);
};