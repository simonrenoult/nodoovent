module.exports = function ( sequelize, type ) {
    return sequelize.define ( "comments", 
        {
            "com_content"   : type.STRING
        },
        {
            instanceMethods: {
                JackSONFive: function ( comment ){
                    var user = comment.getUsers ( );
                    var element = comment.getElements ( );
                    return {
                        "com_content": comment.com_content,
                        "id": comment.id,
                        "createdAt": comment.createdAt,
                        "updatedAt": comment.updatedAt,
                        "user": {
                            "user_name": user.user_name,
                            "id": user.id,
                            "createdAt": user.createdAt
                        },
                        "element": {
                            "ele_name": element.ele_name,
                            "ele_end_date": element.ele_end_date,
                            "id": element.id,
                            "userId": {
                                "user_name": user.user_name,
                                "id": user.id,
                                "createdAt": user.createdAt
                            },
                            "statuId": {
                                "sta_name": status.sta_name,
                                "id": status.id
                            }
                        }
                    }
                }
            }
        } 
    );
};