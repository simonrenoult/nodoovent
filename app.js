/*
 * Require the node modules.
 * http is a native nodejs module.
 * orm is installed from Node Package Manager (npm),
 * already present in node_modules folder.
 */
var http = require ( 'http' )
  , orm = require ( 'orm' )
  , conf = require ( './lib/config.js' ) ( './conf.json' )
  , models = require ( './lib/models.js' )
  , server = require ( './lib/server.js' )
  , router = require ( './lib/routes/_index.js' )
  , handler = require ( './lib/handler.js' );

/*
 * Connect orm to db
 */

var connectionAddress =  conf.db.type + '://'
    + conf.db.user + ':' + conf.db.password
    + '@' + conf.db.host + ':' + conf.db.port + '/' + conf.db.dbName;

orm.connect ( connectionAddress, function ( success, db ) {
    if ( !success ) {
        console.log ( 'Could not connect to database.' );
    } else {
        console.log ( 'Application connected to database.' );
        console.log ( connectionAddress );

        models.initialize ( db );

        server.create ( db, router, handler ).listen ( conf.api.port, conf.api.address );
    }
} );

console.log ( 'Server running at http://' + conf.api.address + ':' + conf.api.port + '.');
