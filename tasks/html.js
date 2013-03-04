/*
 * Build HTML from mustache files
 * https://github.com/sellside/ui/grunt.js
 *
 * Copyright (c) 2012 Sellside
 * Authored by Jon Schlinkert
 */

module.exports = function(grunt) {

	// Grunt utilities.
	var task = grunt.task,
		file = grunt.file,
		utils = grunt.util,
		log = grunt.log,
		verbose = grunt.verbose,
		fail = grunt.fail,
		option = grunt.option,
		config = grunt.config,
		template = grunt.template,
		_ = utils._;

	// external dependencies
	var fs   = require('fs'),
		hogan  = require('hogan.js');


	// ==========================================================================
	// TASKS
	// ==========================================================================
	grunt.registerMultiTask('html', 'Compile mustache(hogan) files to HTML with hogan.js', function() {

		var data     = this.data,
			src        = grunt.file.expandFiles(this.file.src),
			dest       = grunt.template.process(data.dest),

			// Options are set in gruntfile
			defaults   = {
				production:  false,
				docs:        false,
				title:      'Wireless Generation',
				setAccount: 'NA',
				setSiteId:  'NA',
				layout:     'views/layout/layout.html',
				paths: {},
				partials: {}
			},

			options = _.extend(defaults, this.data.options || {});

			if (!src) {
				grunt.warn('Missing src property.');
				return false;
			}

			if(!dest) {
				grunt.warn('Missing dest property');
				return false;
			}

		var done = this.async(),
			srcFiles = file.expandFiles(src);

		if(options.paths.partials) {

			var partials = grunt.file.expandFiles(options.paths.partials);
			log.writeln('Compiling Partials...');
			partials.forEach(function(filepath) {
				var filename = _.first(filepath.match(/[^\\\/:*?"<>|\r\n]+$/i)).replace(/\.html$/, '');
				log.writeln(filename.magenta);

				var partial = fs.readFileSync(filepath, 'utf8');
				options.partials[filename] = hogan.compile(partial);

			});
			log.writeln();
		}

		try {
			options.layout = fs.readFileSync(options.layout, 'utf8');
			options.layout = hogan.compile(options.layout, {
				sectionTags: [{
					o: '_i',
					c: 'i'
				}]
			});
		} catch(err) {
			grunt.warn(err);
			done(false);
			return;
		}

		srcFiles.forEach(function(filepath) {
			var filename = _.first(filepath.match(/[^\\\/:*?"<>|\r\n]+$/i)).replace(/\.html$/, '');

			grunt.helper('hogan', filepath, filename, options, function(err, result) {
				if(err) {
					grunt.warn(err);
					done(false);
					return;
				}

				file.write(dest.replace('FILE', filename), result);
			});
		});

		done();
	});

	// ==========================================================================
	// HELPERS
	// ==========================================================================
	grunt.registerHelper('hogan', function(src, filename, options, callback) {
		log.writeln('Compiling ' + filename.magenta);

		var page = fs.readFileSync(src, 'utf8'),
			html = null,
			layout = options.layout,
			context = {};

		context[filename] = 'active';
		context._i = true;
		context.production = options.production;
		context.docs = options.docs;
		context.setAccount = options.setAccount;
		context.setSiteId = options.setSiteId;

		var title = _.template("<%= page == 'Index' ? site : page + ' · ' + site %>");
		context.title = title({
			page: _(filename).humanize().replace('css', 'CSS'),
			site: options.title
		});
		try {
			page = hogan.compile(page, {
				sectionTags: [{
					o: '_i',
					c: 'i'
				}]
			});

			options.partials.body = page;
			page = layout.render(context, options.partials);

			callback(null, page);
		} catch(err) {
			callback(err);
			return;
		}
	});
};