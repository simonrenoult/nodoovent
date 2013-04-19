const CONFIG_FILE_PATH = './conf.json';

var conf = require ( __dirname + '/lib/config.js' ) ( CONFIG_FILE_PATH )
  , args = require ( __dirname + '/lib/args.js' ) ( conf.args )
  , server = require ( __dirname + '/lib/server.js' )
  , orm = require ( __dirname + '/lib/models' )
  , router = require ( __dirname + '/lib/routes' );

orm.init ( conf.db[args.dbLocation], args.logging, function ( models ) {
    
    if ( args.test ) {

        // Process unit tests session.
    
    } else {

        // Process a normal session.
        
        var _server = server.create ( conf.api );
        router.process ( conf.routes, _server, models );
        
    }
} );
