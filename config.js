/*global require:true, __dirname:true, process:true, module:true */

// The purpose of this file is to setup the use
// of a configuration file for our node development server.

// Modules.
var nconf = require('nconf'),
	fs = require('fs');

// Configuration object.
var config = {};

// Setup nconf to use (in-order) command-line arguments and environment variables.
nconf.argv().env();

// NODE_ENV is an environment variable that can be defined and set
// when the server is started (i.e., NODE_ENV=production node app.js).
// This is currently not leveraged in this implementation but could
// be used to set specific production or development configuration files.
var NODE_ENV = process.env.NODE_ENV || 'development';

// Define configuration path.
config.path = __dirname + '/config';

// Define config.json file path.
config.configFile = config.path + '/config.json';

// Setup nconf to use config.json file.
nconf.file({file: config.configFile});

// Export module.
module.exports = config;