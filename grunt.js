/*global exports:true, module:true, require:true */

// Modules.
var nconf = require('nconf'),
	config = require('./config');

// Grunt.
module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',

		// Server used for tests.
		server: {
			port: nconf.get('GRUNT_PORT'),
			base: nconf.get('GRUNT_BASE_URL')
		},

		// Executes jasmine tests with phantomjs.
		exec: {
			jasmine: {
				command: 'phantomjs public/js/lib/jasmine/jasmine-runner.js http://' + nconf.get('GRUNT_HOST') + ':' + nconf.get('GRUNT_PORT') + '/js/test/',
				stdout: true
			}
		},

		// Watch source and spec files.
		// When they change execute the exec task.
		watch: {
			src: {
				files: [
					'public/js/src/**/*.js',
					'public/js/test/**/*.js',
					'config/*.js',
					'lib/*.js',
					'*.js'
				],
				tasks: ['lint']
			},
			test: {
				files: [
					'public/js/src/**/*.js',
					'public/js/test/**/*.js'
				],
				tasks: ['exec']
			}
		},

		// Linted Directories.
		lint: {
			all: [
				'public/js/src/**/*.js',
				'public/js/test/**/*.js',
				'config/*.js',
				'*.js'
			]
		},

		// Linting options.
		jshint: {
			options: {
				nomen: false,
				curly: true,
				camelcase: true,
				eqeqeq: true,
				newcap: true,
				undef: true,
				trailing: true,
				strict: true,
				latedef: true,
				indent: true,
				quotmark: true
			},
			global: {
				define: true,
				window: true,
				document: true
			}
		},

		// Compile less files into css.
		less: {
			development: {
				files: {
					'public/css/app.css': 'public/less/app.less'
				}
			},
			production: {
				files: {
					'target/gallery-ui/css/app.css': 'public/less/app.less'
				},
				options: {
					compress: true
				}
			}
		},

		// Optimize and compress JavaScript source files.
		requirejs: {
			compile: {
				options: {
					baseUrl: './public/js/src',
					mainConfigFile: './public/js/src/main.js',
					out: './target/gallery-ui/js/main.js',
					name: 'main'
				}
			}
		},

		// Compile index.html into 'target' build directory.
		html: {
			production: {
				src: 'views/*.html',
				dest: 'target/gallery-ui/FILE.html',
				options: {
					title: 'Angular with Require || Gallery',
					url: 'docs',
					setAccount: 'NA',
					setSiteId: 'NA',
					layout: 'views/layout/layout.html',
					dev: false,
					docs: true,
					app: false,
					website: false,
					paths: {
						partials: 'views/partials/*.html'
					}
				}
			}
		},

		// Copy additional artifacts into 'target' build directory.
		copy: {
			dist: {
				files: {
					'target/gallery-ui/img/': 'public/img/**',
					//'target/gallery-ui/i18n/': 'public/i18n/**',
					'target/gallery-ui/template/': 'public/template/**',
					'target/gallery-ui/font/': 'public/less/lib/font-awesome/font/**',
					'target/gallery-ui/data/': 'public/data/**'
				}
			}
		}
	});

	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadTasks('tasks');

	// Register tasks.
	grunt.registerTask('test', 'server exec');
	grunt.registerTask('test.watch', 'server exec watch:test');
	grunt.registerTask('default', 'lint less requirejs html copy');
};