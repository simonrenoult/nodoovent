var restify = require ( 'restify' );

/*
 * Main server module function.
 * Configure the server with the required modules.
 *
 * @param conf {Object} API configuration.
 */
exports.create = function ( conf ) {
	var server = restify.createServer();
	server.use ( restify.bodyParser ( ) );
	server.listen ( conf.port, conf.address );
	
	return server;
};
