/*
 * Require the node modules.
 * orm is installed from npm, already present in node_modules folder.
 */
var Sequelize = require ( 'sequelize' )
  , conf = require ( './lib/config.js' ) ( './conf.json' )
  , models = require ( './lib/models' )
  , handler = require ( './lib/handler' )
  , router = require ( './lib/routes' )
  , server = require ( './lib/server.js' )
  , test = require ( './tests' ).isRequired ( );


/**
 * Connect the orm module to the database.
 * If connection is successful, initialize the models and create a server.
 *
 * @param conf {Object} Configuration file object.
 * @param Sequelize {Object} Orm module.
 * @param {Function} Called if db connection succeeds.
 */
models.connectOrm ( conf, Sequelize, function ( sequelize ) {
    var modelsObject = models.initialize ( sequelize );

    console.log ( 'API running at http://'
            + conf.api.address + ':' + conf.api.port + '.' );
            
    if ( !test ) {
		// Create an instance of the HTTP server.
		server.create ( conf.api, function ( req, res ) {
		    // Execute the router function each time the server is requested.
		    router ( conf.resources, req, handler, modelsObject, function ( result ) {
		    	handler.respond ( res, result );
		    } );
		} );
	} else {
		console.log ( "\nTesting session is processing." );
		require ( __dirname + '/tests/elements.tests.js' ) ( conf, modelsObject.elements, handler );
		require ( __dirname + '/tests/users.tests.js' ) ( conf, modelsObject.users, handler );
	}
} );
