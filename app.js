/*
 * Require the node modules.
 * orm is installed from npm, already present in node_modules folder.
 */
var Sequelize = require ( 'sequelize' )
  , conf = require ( './lib/config.js' ) ( './conf.json' )
  , models = require ( './lib/models' )
  , handler = require ( './lib/handler' )
  , router = require ( './lib/routes' )
  , server = require ( './lib/server.js' );

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
    
    var testSession = false;
    for ( var i = 0 ; i < process.argv.length ; i++ ) {
    	if ( process.argv[i] === '--test' || process.argv[i] === '-t' ) {
    		testSession = true;
    	}
    }

    console.log ( 'API running at http://'
            + conf.api.address + ':' + conf.api.port + '.' );
            
    if ( !testSession ) {
		// Create an instance of the HTTP server.
		server.create ( conf.api, function ( req, res ) {
		    // Execute the router function each time the server is requested.
		    router ( conf.resources, req, handler, modelsObject, function ( result ) {
		    	handler.respond ( res, result );
		    } );
		} );
	} else {
		// Wait 500ms to be sure the shell is free.
		setTimeout ( function ( ) {
			var elements = require ( __dirname + '/tests/elements.tests.js' ) ( conf, modelsObject.elements, handler );
		}, 500 );
	}
	
} );
