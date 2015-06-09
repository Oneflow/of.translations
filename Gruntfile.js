var grunt = require('grunt');

grunt.initConfig({
    ngtemplates: {
        'of.translations': {
            src: 'templates/**/*.html',
            dest: 'src/templates.js'
        }
    },
    concat: {
      dist: {
        src: 'src/*.js',
        dest: 'dist/index.js'
      }
    }
});

grunt.loadNpmTasks('grunt-angular-templates');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask('default', 
    [
      'ngtemplates',
      'concat'
    ]);