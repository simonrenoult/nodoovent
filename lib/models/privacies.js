/*
 * Define a new model called "privacies".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "privacies", {
        pri_name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    } );
};