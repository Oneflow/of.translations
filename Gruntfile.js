var grunt = require('grunt');

grunt.initConfig({
    ngtemplates: {
        'oneflow.image-upload': {
            src: 'templates/**/*.html',
            dest: 'src/templates.js'
        }
    },
    concat: {
      dist: {
        src: 'src/*.js',
        dest: 'dist/image-upload.js'
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('cssnext'),
          require('postcss-nested'),
          require('autoprefixer-core')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'src/*.css',
        dest: 'dist/image-upload.css'
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