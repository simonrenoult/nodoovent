module.exports = function ( orm, dbConf ) {
    console.log ( 'Connecting to : ' + 
        dbConf.type + '://' + dbConf.user + ':' + dbConf.password
        + '@' + dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName );

    orm.connect ( dbConf.type + '://' + dbConf.user + ':' + dbConf.password
        + '@' + dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName, 
        function ( success, db ) {
            if ( !success ) {
                console.log ( 'Could not connect to database.' );
                return;
            } else {
				initializeModels ( db );
				return db;
            }
        } 
	);
};

function initializeModels ( db ) {
	require ( './author.js' ).initialize ( db );
}
