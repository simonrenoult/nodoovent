/*
 * Require the node modules. 
 *  HTTP is a native nodejs module.
 *  mysql is installed from Node Package Manager (npm),
  * already present in node_modules folder.
 */
var http = require ( 'http' )
  , Client = require ( 'mysql' ).Client;

/*
 * Create a new mysql database client. You must specified the user, 
 * password, host and port values.
 */
var dbClient = new Client ( );
    dbClient.user = '';
    dbClient.password = '';
    dbClient.host = '';
    dbClient.port = '';

/*
 * Create the node.js server.
 * 
 * req is an HTTP.Request object, containing all the request user informations.
 * res is an HTTP.Response object, used to answer to the client. 
 *
 */
http.createServer ( function ( req, res ) {
  res.writeHead( 200, {'Content-Type': 'text/plain'} );
  res.end( 'Hello World\n' );
} ).listen ( 1337, '127.0.0.1' );

/*
 * Handle the database queries.
 */
dbClient.query ( 'USE simonren_nodoovent' );
dbClient.query ( 
  'SELECT * FROM author',
  function selectAll ( err, res, fields ) {
    if ( err )
      throw err;
    else
      console.log(res);
  }
);

/*
 * Display informations in the console.
 */
console.log ( 'Server running at http://127.0.0.1:1337/ ');
