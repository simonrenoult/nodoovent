/*
 * Require the node modules.
 * orm is installed from npm, already present in node_modules folder.
 */
var orm = require ( 'orm' )
  , conf = require ( './lib/config.js' ) ( './conf.json' )
  , models = require ( './lib/models' )
  , router = require ( './lib/routes' )
  , handler = require ( './lib/handler.js' )
  , server = require ( './lib/server.js' );

/**
 * Connect the orm module to the database.
 * If connection is successful, initialize the models and create a server.
 *
 * @param conf {Object} Configuration file object.
 * @param orm {Object} Orm module.
 * @param {Function} Called if db connection succeeds.
 */
models.connectOrm ( conf, orm, function ( dbConnection ) {
    models.initialize ( dbConnection );
    
    // Create an instance of the HTTP server.

    server.create ( conf.api, function ( req, res ) {
        // Execute the router function each time the server is requested.
        router ( req, handler, models._models, function ( result ) {
            res.writeHead ( result.code, { "Content-Type": "application/json" } );
            res.end ( JSON.stringify ( result.content ) );
        } ); 
    } );

    console.log ( 'API running at http://'
            + conf.api.address + ':' + conf.api.port + '.' );
} );
