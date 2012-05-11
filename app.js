var http = require ( 'http' )
  , Client = require ( 'mysql' ).Client;

var client = new Client ( );
    client.user = '';
    client.password = '';
    client.host = '';
    client.port = '';
    
http.createServer ( function ( req, res ) {
  res.writeHead( 200, {'Content-Type': 'text/plain'} );
  res.end( 'Hello World\n' );
} ).listen ( 1337, '127.0.0.1' );

client.query ( 'USE simonren_nodoovent' );

client.query ( 
  'SELECT * FROM author',
  function selectAll ( err, res, fields ) {
    if ( err )
      throw err;
    else
      console.log(res);
  }
);

console.log ( 'Server running at http://127.0.0.1:1337/ ');
