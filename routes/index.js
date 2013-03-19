/*global exports:true, module:true, require:true */

// Maps routes to separate module files.
module.exports = function (app) {
	require('./page')(app);
	require('./photos')(app);
};