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
    var Tag = require ( './tag.js' ).initialize ( db ),
        Category = require ( './category.js' ).initialize ( db ),
        Author = require ( './author.js' ).initialize ( db ),
        Element = require ( './element.js' ).initialize ( db );

    Tag.sync ( );
    Category.sync ( );
    Author.sync ( );
    Element.sync ( );

    test ( );
}

function test ( ) {
    var Author = new require ( './author.js' ).Author;
	var g4llic4 = new Author ( {"aut_name":"g4llic4"} );
	g4llic4.save ( function ( err) {
		if ( err ) {
			return console.log ( "Not saved." );
		} else {
			console.log ( "Record saved." );
		}
	} );
	Author.get ( 1, function ( res ) {
		console.log ( res ) ;
	} );
}