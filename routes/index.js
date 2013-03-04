/**
Maps routes to separate module files.

@param {Object} app Express application instance.
**/
module.exports = function (app) {
	require('./page')(app);
};