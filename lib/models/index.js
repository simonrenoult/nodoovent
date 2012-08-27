/*
 * Connect the ORM to the database using the preferences stored within 
 * the configuration file.
 *
 * @param conf {Object} Application preferences (see conf.json).
 * @param Sequelize {Class} ORM used to link database and api models.
 * @param successCallback {Function} Executed once the object is instanciated.
 */
exports.connectOrm = function ( conf, Sequelize, successCallback ) {
    var db = conf.db.isRemote ? conf.db.remote : conf.db.local
      , dbAddress = db.type + '://'
            + db.user + ':' + db.password
            + '@' + db.host + ':' + db.port + '/' + db.dbName
      , sequelize = new Sequelize ( db.dbName, db.user, db.password, {
            host: db.host,
            port: db.port,
            dialect: db.type,
            define: {
                charset: db.encondig
            }
    	} );
    
    console.log ( "API database is located at " + dbAddress );

    successCallback ( sequelize );
};

/*
 * Initialize the models creation using the ORM.
 * Each model is defined within a separate file.
 *
 * @param sequelize {Object} ORM used to link models and db.
 * @return {Object} Structure containing the models.
 */
exports.initialize = function ( sequelize ) {
	// Importing module through sequelize.
	var Users = sequelize.import ( __dirname + "/users.js" )
	  , Elements = sequelize.import ( __dirname + "/elements.js" )
	  , Tags = sequelize.import ( __dirname + "/tags.js" )
	  , Comments = sequelize.import ( __dirname + "/comments.js" )
	  , Status = sequelize.import ( __dirname + "/status.js" );
	
	/* Associations. */
		
	// Users can have several elements.
	Users.hasMany ( Elements );
	
	// Elements can involve several users. 
	Elements.hasMany ( Users, { as : "participant" } );
	
	// An element has an initial user called author.
	Users.hasOne ( Elements, { as : "author" } );

	// An elements can have several tags.	
	Elements.hasMany ( Tags );
	
	// Tags can be used for several elements.
	Tags.hasMany ( Elements );
	
	// Elements can have several comments.
	Elements.hasMany ( Comments );
	
	// A comment belongs to an initial element called "referenced_elements".
	Comments.belongsTo ( Elements, { as : "referenced_element" } );
	
	// A status can define several elements.
	Status.hasMany ( Elements );

	// An element always has a unique status.	
	Elements.belongsTo ( Status, { as : "current_status" } );
	
	// Tables creation.
	Users.sync ( );
	Elements.sync ( );
	Tags.sync ( );
	Comments.sync ( );
	Status.sync ( );
	
	return {
		users: Users,
		elements : Elements,
		tags : Tags,
		comments : Comments,
		status : Status
	};
};
