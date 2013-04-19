module.exports = function ( sequelize, DataTypes ) {
	return sequelize.define ( "users", {
		use_name : {
			type : DataTypes.STRING,
			unique : true
		},
		use_password : DataTypes.STRING,
		use_email : {
			type : DataTypes.STRING,
			validate : {
				isEmail : true 
			}
		},
		use_img_link : {
			type : DataTypes.STRING,
			validate : {
				isUrl : true
			} 
		},
		
	} );
};