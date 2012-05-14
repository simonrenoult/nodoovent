/*
 * Require the node modules.
 * HTTP is a native nodejs module.
 * mysql is installed from Node Package Manager (npm),
 * already present in node_modules folder.
 */
var appConf = require ( './lib/config.js' ) ( './conf.json' )
  , orm = require ( 'orm' )
  , db = require ( './lib/db/index.js' ) ( orm, appConf.db )
  , handler = require ( './lib/handler.js' ) ( db )
  , router = require ( './lib/router.js' )
  , server = require ( './lib/server.js' ) ( router, handler );

server.listen ( appConf.api.port, appConf.api.address );

console.log ( 'Server running at http://' + appConf.api.address + ':' + appConf.api.port + '.');
