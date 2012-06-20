var http = require ( 'http' );

/*
 * Main server module function.
 * Execute the callback function each time the server is requested.
 */
exports.create = function ( api, callback ) {
	return http.createServer ( callback ).listen ( api.port, api.address );
};
