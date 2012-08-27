/*
 * Define a new model called "status".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "status", {
        sta_name : {
        	type : DataTypes.STRING,
        }
    } );
};
