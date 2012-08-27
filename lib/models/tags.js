/*
 * Define a new model called "tags".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "tags", { 
    	tag_name : {
    		 type : DataTypes.STRING
    	} 
    } );
};
