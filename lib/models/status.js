module.exports = function ( sequelize, type ) {
    return sequelize.define ( "status", {
        "sta_name": type.STRING
    } );
};