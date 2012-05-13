/*
dbClient.query ( 
  'SELECT * FROM author',
  function selectAll ( err, res, fields ) {
	if ( err )
	  throw err;
	else
	  console.log(res);
  }
);*/

module.exports = function ( clientClass, dbConf ) {
    var client = new clientClass ( );
        client.user = dbConf.user;
        client.password = dbConf.password;
        client.host = dbConf.host;
        client.port = dbConf.port;
        client.query ( 'USE ' + dbConf.dbName );

    return client;
};
