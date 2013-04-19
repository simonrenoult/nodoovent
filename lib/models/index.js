var Sequelize = require ( 'sequelize' );

/*
 * Connect the ORM to the database using the preferences stored within 
 * the configuration file.
 *
 * @param conf {Object} Application preferences (see conf.json).
 * @param logging {Function/Boolean} Whether the orm logs its traces in the console.
 * @param conf {Function} Callback to execute once the function is done.
 */
exports.init = function ( conf, logging, next ) {

    var orm = new Sequelize ( conf.name, conf.user, conf.password, {
            host: conf.host,
            port: conf.port,
            dialect: conf.type,
            logging: logging 
        }
    );
    
    // Inititialize the ORM models 
    var models = initModels ( orm );
    
    return next ( models );
};

/*
 * Initialize the models using the ORM.
 * Each model is defined within a separate file.
 *
 * @param sequelize {Object} ORM used to link models and db.
 */
exports.initModels = initModels = function ( sequelize, next ) {

    var Elements = sequelize.import ( __dirname + '/elements.js' )
      , Users = sequelize.import ( __dirname + '/users.js' )
      , Tags = sequelize.import ( __dirname + '/tags.js' );
    
    // Linking Users and Elements.
    Users.hasMany ( Elements );
    Elements.hasMany ( Users, { as : "participant" }  );
    Elements.belongsTo ( Users, { as : "author" } );
    
    // Linking Elements and Tags.
    Elements.hasMany ( Tags );
    Tags.hasMany ( Elements );
    
    // Database synchronisation.
    Elements.sync ( );
    Users.sync ( );
    Tags.sync ( );
    
    return {
      elements: Elements,
      users: Users,
      tags: Tags
    };
};
