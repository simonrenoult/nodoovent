/*
 * Define a new model called "users".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "users", {
        use_name : {
        	type : DataTypes.STRING,
        	unique : true
        },
        use_password : {
        	type : DataTypes.STRING
        }
    } );
};
