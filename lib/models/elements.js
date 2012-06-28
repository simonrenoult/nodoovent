module.exports = function ( sequelize, type ) {
    return sequelize.define ( "elements", {
        "ele_name"   : type.STRING,
        "ele_content"   : type.STRING
    } );
};