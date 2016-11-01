module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    
      watch: {
          ts: {
            files: ['/home/ubuntu/workspace/client/app/ts/*.ts'],
            tasks: ['ts']
          },
            
      },
  
      ts: {
        dev: {
              files: [{
                    src: ["**/*.ts", "!node_modules/**"],
                    dest: '/home/ubuntu/workspace/client/app/js'
                  
                }], 
                          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                options: {
                    watchTask: true,
                    target: 'es5',
                    module: 'commonjs',
                    moduleResolution: 'node',
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false
                }
                
            }
      },
    
      browserSync: {
        default_options: {
            bsFiles: {
                src : [
                      '/home/ubuntu/workspace/*.html',
                      '/home/ubuntu/workspace/client/styles/*.css',
                      '/home/ubuntu/workspace/client/app/js/*.js',
                ]
            },
            options: {
                watchTask: true,
                proxy: "localhost:8080",
                port: 8080
            }
        }
      },
      
      // uglify: {
      //   options: {
      //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      //   },
      //   build: {
      //     src: 'src/<%= pkg.name %>.js',
      //     dest: 'build/<%= pkg.name %>.min.js'
      //   },
      // },
      
      
      uglify: {
        my_target: {
          options: {
            mangle: true
          },
          files: {
            '/home/ubuntu/workspace/client/app/js//output.min.js': ['/home/ubuntu/workspace/client/app/js/main.js']
          }
        }
      },
      
    
      express: {
        dev: {
          options: {
            script: '/home/ubuntu/workspace/server/Server.js'
          }
        }
      }
    
  
  
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  // grunt.registerTask('default', ['browserSync', 'watch']);
  
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-ts');
  
  
  
  grunt.registerTask('default', ['express', 'ts', 'browserSync', 'watch']);
  

};