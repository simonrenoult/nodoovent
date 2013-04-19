module.exports = function ( sequelize, DataTypes ){
    return sequelize.define ( 'elements', {
    	ele_name : DataTypes.STRING,
    	ele_content : DataTypes.TEXT,
    	ele_deadline : DataTypes.DATE
    } );
}
