/*
 * Define a new model called "comments".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "comments", {
        com_content : {
        	type : DataTypes.TEXT,
                allowNull : false
        }
    } );
};
