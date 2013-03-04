var system = require('system');

var jasmineRunner = {
	page: {},
	runner: {},

	check: function (condition, onReady, timeout) {
		// Define.
		var start, interval;

		// Initialize.
		timeout = (timeout) ? timeout : 3000;
		start = new Date().getTime();

		// Stop the script when the condition parameter is not a function.
		if (typeof condition !== 'function') {
			console.log("Invalid parameter. The condition parameter must be a function.");
			phantom.exit(1);
		}

		// Stop the script when the onReady parameter is not a function.
		if (typeof onReady !== 'function') {
			console.log("Invalid parameter. The onReady parameter must be a function.");
			phantom.exit(1);
		}

		// Stop the script when the timeout parameter is not number.
		if (typeof timeout !== 'number') {
			console.log("Invalid parameter. The timeout parameter must be a number.");
			phantom.exit(1);
		}

		// Recursive interval logic.
		interval = setInterval(function () {
			var timer = (new Date().getTime() - start);
			// Clear the interval when the timer
			// exceeds the timeout.
			if (timer >= timeout) {
				console.log("'check(condition)' timeout.");
				clearInterval(interval);
				phantom.exit(1);
			}

			// Clear the interval and execute the onReady()
			// method that should execute after the condition
			// has been met.
			if (condition()) {
				onReady();
				clearInterval(interval);
			}
		}, 100);
	},

	openPage: function () {
		// Create page object.
		page = require('webpage').create();

		// Route log calls from within the Page context.
		page.onConsoleMessage = function (msg, lineNum, sourceId) {
			console.log(msg);
		};

		// Open webpage.
		page.open(system.args[1], function (status) {
			if (status !== 'success') {
				console.log('Unable to access network.');
				phantom.exit(1);
			}

			// Passes the condition to test as well as what to do
			// when the condition is satisfied.
			runner.check(
				function () {
					return page.evaluate(function () {
						var pending, description;
						pending = document.body.querySelector('.symbolSummary .pending');
						description = document.body.querySelector('.description');

						return (pending === null) && (description !== null);
					});
				},
				function () {
					var exitCode = page.evaluate(function () {
						var builder = {
							root: {},
							exitCode: 0,

							// Builds the header.
							buildHeader: function () {
								var banner, title, version, duration;
								banner = this.root.querySelector('.banner');
								title = banner.querySelector('.title').innerText;
								version = banner.querySelector('.version').innerText;
								duration = banner.querySelector('.duration').innerText;

								console.log('');
								console.log(title + ' ' + version);
								console.log(duration);
								console.log('');
							},

							// Output a '.' for every passing test and an 'x' for every failing test.
							buildSymbols: function () {
								var symbols, symbol_length, symbol, symbol_class, x;
								symbols = this.root.querySelectorAll('.symbolSummary li');
								symbol_length = symbols.length;
								symbol = '';
								x = 0;

								for (x = 0; x < symbol_length; x++) {
									symbol_class = symbols[x].getAttribute('class');
									if (symbol_class === 'passed') {
										symbol = symbol + '.';
									} else if (symbol_class === 'failed') {
										symbol = symbol + 'x';
									} else {
										console.log('Invalid class found on symbol list item.');
										phantom.exit(1);
									}
								}
								console.log(symbol);
							},

							// Builds out the alert bar.
							buildAlertBar: function () {
								var failures, alertBar, alertResults;
								failures = this.root.querySelectorAll('.results #details .specDetail.failed');
								alertBar = (failures.length > 0) ? this.root.querySelector('.alert .failingAlert').innerText : this.root.querySelector('.alert .passingAlert').innerText;
								alertResults = (failures.length > 0) ? this.root.querySelector('.alert .resultsMenu').innerText : '';

								console.log(alertBar);
								console.log(alertResults);
								console.log('');
							},

							// Builds out the summary successful tests.
							buildSuccessSummary: function () {
								if (this.root.querySelectorAll('.results #details .specDetail.failed').length > 0) {
									return;
								}

								var result, result_length, suite, spec, description, x;
								result = this.root.querySelectorAll('.results .summary .suite.passed');
								result_length = result.length;
								x = 0;

								console.log('|========== Passing Tests ==========|');
								for (x; x < result_length; x++) {
									suite = result[x];
									spec = suite.querySelector('.description').innerText;
									description = suite.querySelector('.specSummary.passed').innerText;

									console.log(spec);
									console.log(' ', description);
								}

								this.exitCode = 0;
							},

							// Builds out a summary of failed tests.
							buildFailureSummary: function () {
								if (this.root.querySelectorAll('.results #details .specDetail.failed').length < 1) {
									return;
								}

								var result, result_length, suite, description, message, x;
								result = this.root.querySelectorAll('.results #details .specDetail.failed');
								result_length = result.length;
								x = 0;

								console.log('|========== Failing Tests ==========|');
								console.log(result_length + ' test(s) FAILED:');
								for (x; x < result_length; x++) {
									suite = result[x];
									description = suite.querySelector('.description').innerText;
									message = suite.querySelector('.resultMessage.fail').innerText;

									console.log(description);
									console.log(message);
								}

								this.exitCode = 1;
							},

							// Entry point for builder.
							init: function () {
								this.root = document.body;
								this.exit = 0;
								this.buildHeader();
								this.buildSymbols();
								this.buildAlertBar();
								this.buildSuccessSummary();
								this.buildFailureSummary();
							}
						};
						builder.init();
						return builder.exitCode;
					});
					phantom.exit(exitCode);
				}
			);
		});
	},

	// Entry point for the runner script.
	// Exits when the wrong number of arguments is passed.
	init: function () {
		if (system.args.length !== 2) {
			console.log('Incorrect number of arguments.');
			phantom.exit(1);
		}

		runner = this;
		runner.openPage();
	}
};
jasmineRunner.init();