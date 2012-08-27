/*
 * Define a new model called "elements".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "elements", { 
    	ele_name : {
    		 type : DataTypes.STRING
    	},
    	ele_content : {
    		type : DataTypes.TEXT
    	},
    	ele_due_date : {
    		type : DataTypes.DATE
    	}
    } );
};
