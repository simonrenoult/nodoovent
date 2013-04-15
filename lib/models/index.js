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
            logging: conf.orm.logging_for_debug,
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
	  , Groups = sequelize.import ( __dirname + "/groups.js" )
	  , Status = sequelize.import ( __dirname + "/status.js" )
      , Privacies = sequelize.import ( __dirname + "/privacies.js" );
	
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
        
    // A user can have several comments.
    Users.hasMany ( Comments );
        
    // A comment have an initial user calles author.
    Users.hasOne ( Comments, { as : "author" } );
	
	// A status can define several elements.
	Status.hasMany ( Elements );

	// An element always has a unique status.	
	Elements.belongsTo ( Status, { as : "current_status" } );
        
    // A group has a administrator.
    Users.hasOne ( Groups, { as : "administrator" } );
        
    // A group can gather several users.
    Groups.hasMany ( Users );
        
    // A user can have several groups.
    Users.hasMany ( Groups );
        
    // Groups can have several elements.
    Groups.hasMany ( Elements );
        
    // An element can have an initial group called "reference_group"
    Groups.hasOne ( Elements, { as : "referenced_group" } );
        
    // An element have a privacy status
    Privacies.hasOne ( Elements, { as : "privacy" } );
	
	// Tables creation.
	Users.sync ( );
	Elements.sync ( );
	Tags.sync ( );
	Comments.sync ( );
    Groups.sync ( );
	Status.sync ( );
    Privacies.sync ( );
	
	return {
		users: Users,
		elements : Elements,
		tags : Tags,
		comments : Comments,
        groups : Groups,
		status : Status,
        privacies : Privacies
	};
};
