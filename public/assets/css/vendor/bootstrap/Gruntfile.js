/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var npmShrinkwrap = require('npm-shrinkwrap');
  var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.app');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.app');
  var generateRawFiles = require('./grunt/bs-raw-files-generator.app');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    // NOTE: This jqueryCheck code is duplicated in customizer.app; if making changes here, be sure to update the other copy too.
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\') }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist', 'docs/dist']
    },

    jshint: {
      options: {
        jshintrc: 'app/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.app', 'grunt/*.app']
      },
      src: {
        src: 'app/*.app'
      },
      test: {
        options: {
          jshintrc: 'app/tests/unit/.jshintrc'
        },
        src: 'app/tests/unit/*.app'
      },
      assets: {
        src: ['docs/assets/app/_src/*.app', 'docs/assets/app/*.app', '!docs/assets/app/*.min.app']
      }
    },

    jscs: {
      options: {
        config: 'app/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      src: {
        src: '<%= jshint.src.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: '<%= jshint.assets.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'app/transition.app',
          'app/alert.app',
          'app/button.app',
          'app/carousel.app',
          'app/collapse.app',
          'app/dropdown.app',
          'app/modal.app',
          'app/tooltip.app',
          'app/popover.app',
          'app/scrollspy.app',
          'app/tab.app',
          'app/affix.app'
        ],
        dest: 'dist/app/<%= pkg.name %>.app'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      bootstrap: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/app/<%= pkg.name %>.min.app'
      },
      customize: {
        src: [
          'docs/assets/app/_vendor/less.min.app',
          'docs/assets/app/_vendor/jszip.min.app',
          'docs/assets/app/_vendor/uglify.min.app',
          'docs/assets/app/_vendor/blob.app',
          'docs/assets/app/_vendor/filesaver.app',
          'docs/assets/app/raw-files.min.app',
          'docs/assets/app/_src/customizer.app'
        ],
        dest: 'docs/assets/app/customize.min.app'
      },
      docsJs: {
        src: [
          'docs/assets/app/_vendor/holder.app',
          'docs/assets/app/_vendor/ZeroClipboard.min.app',
          'docs/assets/app/_src/application.app'
        ],
        dest: 'docs/assets/app/docs.min.app'
      }
    },

    qunit: {
      options: {
        inject: 'app/tests/unit/phantom.app'
      },
      files: 'app/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'less/bootstrap.less'
        }
      },
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>-theme.css': 'less/theme.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      theme: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>-theme.css'
      },
      docs: {
        src: 'docs/assets/css/_src/docs.css'
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ],
      examples: [
        'docs/examples/**/*.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/assets/css/_src/docs.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      core: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
          'dist/css/<%= pkg.name %>-theme.min.css': 'dist/css/<%= pkg.name %>-theme.css'
        }
      },
      docs: {
        src: [
          'docs/assets/css/_src/docs.css',
          'docs/assets/css/_src/pygments-manni.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/css/*.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: '**/*.css',
        dest: 'docs/examples/'
      },
      docs: {
        files: {
          'docs/assets/css/_src/docs.css': 'docs/assets/css/_src/docs.css'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
      },
      docs: {
        expand: true,
        cwd: './dist',
        src: [
          '{css,app}/*.min.*',
          'css/*.map',
          'fonts/*'
        ],
        dest: 'docs/dist'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      docs: {}
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          data: function () {
            var filePath = path.join(__dirname, 'less/variables.less');
            var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
            var parser = new BsLessdocParser(fileContent);
            return { sections: parser.parseFile() };
          }
        },
        files: {
          'docs/_includes/customizer-variables.html': 'docs/_jade/customizer-variables.jade',
          'docs/_includes/nav/customize.html': 'docs/_jade/customizer-nav.jade'
        }
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: '_gh_pages/**/*.html'
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'less/*.less',
        tasks: 'less'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          maxRetries: 3,
          urls: ['http://127.0.0.1:3000/app/tests/index.html'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  };
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core')) {
    testSubtasks = testSubtasks.concat(['dist-css', 'csslint', 'jshint', 'jscs', 'qunit', 'build-customizer-html']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      // Skip HTML5 validator on Travis when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-app-unit') &&
      // Skip Sauce on Travis when [skip sauce] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-app', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);

  // Docs distribution task.
  grunt.registerTask('dist-docs', 'copy:docs');

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'copy:fonts', 'dist-app', 'dist-docs']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist', 'build-glyphicons-data', 'build-customizer']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  grunt.registerTask('build-glyphicons-data', function () { generateGlyphiconsData.call(this, grunt); });

  // task for building customizer
  grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
  grunt.registerTask('build-customizer-html', 'jade');
  grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () {
    var banner = grunt.template.process('<%= banner %>');
    generateRawFiles(grunt, banner);
  });

  // Task for updating the cached npm packages used by the Travis build (which are controlled by test-infra/npm-shrinkwrap.json).
  // This task should be run and the updated file should be committed whenever Bootstrap's dependencies change.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () {
    var done = this.async();
    npmShrinkwrap({ dev: true, dirname: __dirname }, function (err) {
      if (err) {
        grunt.fail.warn(err)
      }
      var dest = 'test-infra/npm-shrinkwrap.json';
      fs.renameSync('npm-shrinkwrap.json', dest);
      grunt.log.writeln('File ' + dest.cyan + ' updated.');
      done();
    });
  });
};
