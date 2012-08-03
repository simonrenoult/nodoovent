module.exports = function ( sequelize, type ) {
    return sequelize.define ( "users", {
            "user_name": type.STRING,
            "user_password": type.STRING
        },
        {
            instanceMethods: {
                JackSONFive: function ( user ) {
                    var elements = user.getElements ( ).success ( function ( elements ) {
                        var a = new Array ( );
                        for ( var i = 0; i < elements.length; i++ )
                            a.push ( elements[i].id );
                        return a;
                    } );
                    return {
                        "user_name": user.user_name,
                        "user_password": user.user_password,
                        "id": user.id,
                        "createdAt": user.createdAt,
                        "updatedAt": user.updatedAt,
                        "elements": elements
                    }
                }
            }
        }
    );
};