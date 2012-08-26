exports.connectOrm = function ( conf, sequelize, successCallback ) {
    var db = conf.db.isRemote ? conf.db.remote : conf.db.local
      , dbAddress = db.type + '://'
            + db.user + ':' + db.password
            + '@' + db.host + ':' + db.port + '/' + db.dbName
      , orm = new sequelize ( db.dbName, db.user, db.password, {
            host: db.host,
            port: db.port,
            dialect: db.type,
            define: {
                charset: 'utf8'
            }
    	} );
    
    console.log ( orm );    
    console.log ( "API database is " + dbAddress );

    successCallback ( orm );
};

exports.initialize = function ( db ) {
    var Users = db.import ( __dirname + '/users.js' )
      , Tags = db.import ( __dirname + '/tags.js' )
      , Elements = db.import ( __dirname + '/elements.js' )
      , Status = db.import ( __dirname + '/status.js' )
      , Comments = db.import ( __dirname + '/comments.js' );
      
    Elements.hasMany ( Comments, { as: 'comments' } )
            .hasMany ( Tags, { as: 'tags' } )
            .hasMany ( Users, { as: 'users' } )
            .belongsTo ( Status, { as: 'status' } );
    Tags.hasMany ( Elements, { as: 'elements' } );
    Users.hasMany ( Elements, { as: 'elements' } )
         .hasMany ( Comments, { as: 'comments' } )
         .hasOne ( Elements, { as: 'author' } );
    //Status.hasOne ( Elements, {as: 'elements'} );
    
    Tags.sync ( );
    Users.sync ( );
    Elements.sync ( );
    Status.sync ( );
    Comments.sync ( );
    
    var dbObjects = {
        elements: Elements,
        users: Users,
        tags: Tags,
        status: Status,
        comments: Comments
    };
    
    return dbObjects;
};
