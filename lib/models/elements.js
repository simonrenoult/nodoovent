module.exports = function ( sequelize, type ) {
    return sequelize.define ( "elements", 
        {
            "ele_name"   : type.STRING,
            "ele_content"   : type.STRING,
            "ele_end_date" : type.DATE
        },
        {
            instanceMethods: {
                JackSONFive: function ( element ){
                    var status = element.getStatus ( );
                    var user = element.getUser ( );
                    return {
                        "ele_name": element.ele_name,
                        "ele_content": element.ele_content,
                        "ele_end_date": element.ele_end_date,
                        "id": element.id,
                        "createdAt": element.createdAt,
                        "updatedAt": element.updatedAt,
                        "userId": {
                            "user_name": user.user_name,
                            "id": user.id,
                            "createdAt": user.createdAt
                        },
                        "statuId": {
                            "sta_name": status.sta_name,
                            "id": status.id
                        }
                    };
                }
            }
        }
    );
};