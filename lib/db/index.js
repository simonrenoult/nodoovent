var Client = require ( 'mysql' ).Client ;
/*
 * Create a new mysql database client. You must specified the user, 
 * password, host and port values.
 */
var dbClient = new Client ( );
	dbClient.user = 'simonren_ndvnt';
	dbClient.password = 'nodoovent';
	dbClient.host = 'simon-renoult.com';
	dbClient.port = '3306';
	
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
