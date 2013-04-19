module.exports = function ( sequelize, DataTypes ) {
	return sequelize.define ( "tags", { 
		tag_name :  {
			type : DataTypes.STRING,
			unique : true
		}
	} );
};