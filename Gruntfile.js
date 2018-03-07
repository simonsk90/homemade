module.exports = function(grunt) {

    // var projectRootSrc = '/home/simon/Desktop/homemade/';
    var projectRootSrc = process.cwd();
    var fs = require("fs");
    var contents = fs.readFileSync(projectRootSrc + "/clientScripts.json");

    var jsonContent = JSON.parse(contents);


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
        },

        testBundle: {
            options: {
                mangle: false
            },
            files: {

                'client/liveTest/testBundle.js': jsonContent.scripts
            }
        }

      },

      cssmin: {
          options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
          },
          all: {
              files: {
                  'client/liveTest/stylesBundle.css': jsonContent.styles
              }
          }
      },


      prodBundle: {
          options: {
              mangle: true
          },
        files: {
            'client/prod/prodBundle.js': jsonContent.files
        }
      },

      express: {
        dev: {
          options: {
              script: 'server/server.js'
            // script: '/home/ubuntu/workspace/server/server.js'
          }
        }
      },

      nodemon: {
          dev: {
              script: 'server/server.js',

              options: {
                  ignore: ['client/**/*'],
                  delay: 2000,
                  nodeArgs: ['--inspect'/*, '--debug-brk'*/]
                  // nodeArgs: ['--debug=3009'],
                  // nodeArgs: ['--inspect=15454'],
              }

          }
      },

      jshint: {
          all: ['Gruntfile.js', 'client/app/**/*.js', 'server/**/*.js', '!client/app/output.min.js']
      },

      exec: {
          // liteserver: 'lite-server -c bs-config.json',
          liteserver: 'npm run debugsync',
          browserifyLibraries: 'browserify client/libraries/bundlingLibraries.js -o client/libraries/bundleLibraries.js',
          
          // test: "nvm use default > /dev/null; node ${debug?--nocrankshaft --nolazy --nodead_code_elimination --debug-brk=15454} '$file' $args",
          debug: "> /dev/null; node server/server.js {debug?--nocrankshaft --nolazy --nodead_code_elimination --debug-brk=3000} '$file' $args",
          // debug: 'bash --login -c nvm use default > /dev/null; nodemon server/server.js debug? --nocrankshaft --nolazy --nodead_code_elimination --debug-brk=15454'

          mongod: "sudo mongod",
          mongo: {
              cmd: "mongo",
              options: {
                  timeout: 9000
              }
          }

      },

      concurrent: {
          target: {
              tasks: ['nodemon:dev', 'exec:liteserver'],
              options: {
                  logConcurrentOutput: true
              }
          },

          startMongoDb: {
              tasks:['exec:mongod', 'exec:mongo'],
              options: {
                  logConcurrentOutput: true
              }
          },
          
          debug: {
              tasks: ['exec:debug', /*'exec:liteserver'*/],
              options: {
                  logConcurrentOutput: true
              }
          }
      },
      
      // nvm: {
      //   test: {
          
      //   }
      // }

  });

  // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nvm');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
  
    grunt.registerTask('ugl', ['uglify']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['uglify', 'nodemon']);
    grunt.registerTask('mon', ['nodemon']);
    grunt.registerTask('exp', ['express']);
    grunt.registerTask('dev', ['nodemon', 'exec:liteserver']);
    grunt.registerTask('exe', ['exec:liteserver']);
    grunt.registerTask('bundleLibraries', ['exec:browserifyLibraries']);

    grunt.registerTask('debug', ['concurrent:debug']);


    grunt.registerTask('abc', ['nvm:use:7.0.0', 'debug']);

    grunt.registerTask('test', ['exec:test']);

    grunt.registerTask('startMongo', 'concurrent:startMongoDb');

    grunt.registerTask('bundleTest', 'uglify:testBundle');
    grunt.registerTask('cssBundle', 'cssmin:all');

    grunt.registerTask('default', ['concurrent:target']);
    
    

    
};