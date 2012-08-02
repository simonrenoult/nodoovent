module.exports = function ( sequelize, type ) {
    return sequelize.define ( "status", 
        {
            "sta_name": type.STRING
        },
        {
            instanceMethods: {
                JackSONFive: function ( status ){
                    return {
                        "sta_name": status.sta_name,
                        "id": status.id,
                        "createdAt": status.createdAt,
                        "updatedAt": status.updatedAt
                    }
                }
            }
        }
    );
};