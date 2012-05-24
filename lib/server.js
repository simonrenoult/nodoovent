var http = require ( 'http' );

/*
 * Main server module function.
 * Execute the router function as a callback each time the server is requested.
 *
 * @param router
 *          {Module} Dispatch all the routes required by the client.
 * @param handler
 *          {Module} Contains functions depending on the required route.
 */
module.exports = function ( router, handler ) {
	return http.createServer ( function ( req, res ) {
		router ( req, res, handler );
	} );
};
