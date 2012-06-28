module.exports = function ( sequelize, type ) {
    return sequelize.define ( "tags", {
        "tag_name"   : type.STRING
    } );
};