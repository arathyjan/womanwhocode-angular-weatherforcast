'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    test: 'test'
  };

  try {
    yeomanConfig.app = require('./package.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/**/*.js',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.app %>/styles/*.css',
          '!<%= yeoman.app %>/components',
          '!<%= yeoman.app %>/lib'
        ],
        tasks: ['livereload']
      }
      // Tried to link watch to karma, so that watch can run all
      // the background tasks which need to run on file change, including
      // karma. Doesn't seem to be working.
      //
      // https://github.com/karma-runner/grunt-karma#karma-server-with-grunt-watchregarde
      // https://github.com/karma-runner/grunt-karma/issues/30
      // https://github.com/karma-runner/grunt-karma/issues/33
      // https://github.com/karma-runner/grunt-karma/issues/22
      // https://github.com/karma-runner/grunt-karma/issues/36
      //test: {
        //files: [
          //'<%= yeoman.app %>/**/*.js',
          //'<%= yeoman.test %>/unit/**/*.js',
          //'<%= yeoman.test %>/support/**/*.js'
        //],
        //tasks: ['karma:unitd:run']
      //}
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.app %>/styles/*.css',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [ 
        '<%= yeoman.app %>/styles/.css/**'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/config/testacular.conf.js'
      },
      e2e: {
        configFile: 'test/config/testacular-e2e.conf.js'
      },
      auto: {
        configFile: 'test/config/testacular.conf.js',
        autoWatch: true,
        singleRun: false
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.app %>/styles/',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    useminPrepare: {
      html: [
        '<%= yeoman.app %>/patients/*.html',
        '<%= yeoman.app %>/consultation/*.html',
        '<%= yeoman.app %>/modules/**/*.html',
		'<%= yeoman.app %>/admission/**/*.html'
      ],
      css: '<%= yeoman.app %>/styles/.css/**/*.css',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: [
        '<%= yeoman.dist %>/patients/**/*.html',
        '<%= yeoman.dist %>/consultation/**/*.html',
		'<%= yeoman.dist %>/admission/**/*.html'
      ],
      css: '<%= yeoman.dist %>/styles/**/*.css',
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '/* wwc weatherforcast minified CSS file */'
      },
      minify: {
        expand: true,
        cwd: '<%= yeoman.dist %>/styles/css/',
        src: ['**/*.css', '!**/*.min.css'],
        dest: '<%= yeoman.dist %>/styles/css/',
        ext: '.min.css'
      }
    },
    htmlmin: {
      dist: {
        options: {
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: [
            'patients/**/*.html',
            'consultation/**/*.html',
			'admission/**/*.html'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/patients',
          src: '**/*.js',
          dest: '<%= yeoman.dist %>/patients'
        },
        {
          expand: true,
          cwd: '<%= yeoman.dist %>/consultation',
          src: '**/*.js',
          dest: '<%= yeoman.dist %>/consultation'
        },
		{
          expand: true,
          cwd: '<%= yeoman.dist %>/admission',
          src: '**/*.js',
          dest: '<%= yeoman.dist %>/admission'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'images/**/*.{gif,webp}',
            'styles/fonts/*',
            'lib/**/*'
          ]
        }]
      }
    },
    rename: {
      minified: {
        files: [
          {expand: true, cwd: '<%= yeoman.dist %>', src: ['patients.min.js'], dest: '<%= yeoman.dist %>/patients/'},
          {expand: true, cwd: '<%= yeoman.dist %>', src: ['consultation.min.js'], dest: '<%= yeoman.dist %>/consultation/'},
		  {expand: true, cwd: '<%= yeoman.dist %>', src: ['admission.min.js'], dest: '<%= yeoman.dist %>/admission/'},
          {expand: true, cwd: '<%= yeoman.dist %>', src: ['patients.min.css'], dest: '<%= yeoman.dist %>/patients/'},
          {expand: true, cwd: '<%= yeoman.dist %>', src: ['consultation.min.css'], dest: '<%= yeoman.dist %>/consultation/'},
		  {expand: true, cwd: '<%= yeoman.dist %>', src: ['admission.min.css'], dest: '<%= yeoman.dist %>/admission/'}
		  
        ]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'compass',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'compass:dist',
    'useminPrepare',
//    'concat',
    'imagemin',
    'htmlmin',
    'cssmin',
    'copy:dist',
    'ngmin',
    // Commented since it is breaking angular. Possibly because of $rootScope
    //'uglify',
    'usemin'
//    'rename:minified'
  ]);

  grunt.registerTask('build', [
    'test',
    'dist'
  ]);
  
  grunt.registerTask('default', ['build']);
};
