var http = require ( 'http' );

/*
 * Main server module function.
 * Execute the router function as a callback each time the server is requested.
 *
 * @param db {Databse Object} Databse object created by the orm.
 * @param router {Module} Dispatch all the routes required by the client.
 * @param handler {Module} Contains functions depending on the required route.
 */
exports.create = function ( db, router, handler ) {
	return http.createServer ( function ( req, res ) {
        router ( req, handler, db._models, function ( result ) {
            res.writeHead ( result.code, { "Content-Type": "text/plain" } );
            res.end ( JSON.stringify ( result.content ) );
        } );
    } );
};
