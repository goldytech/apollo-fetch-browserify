module.exports = function (grunt) {
    // setup configuration options
  grunt.initConfig({
    browserify: {
      app: {
        src: 'src/index.js',
        dest: 'dist/app.bundle.js',
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    watch: {
      app: {
        files: ['src/**/*.js'],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      app: {
        options: {
          port: 9001,
          base: './dist',
          middleware: function (connect, options, middlewares) {
            middlewares.unshift(require('connect-livereload')())
            return middlewares
          }
        }
      }
    }
  })

    // load additional modules / plugins
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')

    // define tasks
  grunt.registerTask('default', ['browserify'])
  grunt.registerTask('serve', ['browserify:app', 'connect:app', 'watch:app'])
}
