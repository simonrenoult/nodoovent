module.exports = function ( sequelize, type ) {
    return sequelize.define ( "tags", 
        {
            "tag_name"   : type.STRING
        },
        {
            instanceMethods: {
                JackSONFive: function ( tag ){
                    return {
                        "tag_name": tag.tag_name,
                        "id": tag.id,
                        "createdAt": tag.createdAt,
                        "updateddAt": tag.updateddAt
                    }
                }
            }
        }
    );
};