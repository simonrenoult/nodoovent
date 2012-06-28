module.exports = function ( sequelize, type ) {
    return sequelize.define ( "comments", {
        "com_content"   : type.STRING
    } );
};