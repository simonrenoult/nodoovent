exports.connectOrm = function ( conf, orm, successCallback ) {
    var db = conf.db.local,
        dbAddress =  db.type + '://'
            + db.user + ':' + db.password
            + '@' + db.host + ':' + db.port + '/' + db.dbName;

    /**
    * Connect orm to a database.
    *
    * @param dbAddress {String} Used by the orm to connect to the db.
    * @param isConnected {Boolean} Connection to db succeeded or not.
    * @param dbConnection {Object} If connection is ok, contains the db connection.
    */
    orm.connect ( dbAddress, function ( isConnected, dbConnection ) {
        console.log ( 'Trying to connect to :\n' + dbAddress );
        if ( !isConnected ) {
            console.log ( 'Database connection failed !' );
        } else {
            console.log ( 'Database connection successful !' );
            successCallback ( dbConnection );
        }
    } );
}

exports.initialize = function ( db ) {
    var Author = require ( './author.js' ) ( db )
      , Category = require ( './Category.js' ) ( db )
      , Tag = require ( './tag.js' ) ( db )
      , Element = require ( './element.js' ) ( db );

    Element.hasMany ( "tags", Tag, "tag" );
    Element.hasOne ( "authors", Author );
    Element.hasOne ( "category", Category );

    Tag.sync ( );
    Category.sync ( );
    Author.sync ( );
    Element.sync ( );
}