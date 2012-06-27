module.exports = function ( sequelize, type ) {
    return sequelize.define ( "users", {
        "user_name": type.STRING,
        "user_password": type.STRING
    } );
};