/*
 * Define a new model called "groups".
 * id, updatedAt and createdAt attributes are automatically created by the orm.
 */
module.exports = function ( sequelize, DataTypes ) {
    return sequelize.define ( "groups", {
        grp_name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    } );
};