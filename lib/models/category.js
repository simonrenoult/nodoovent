module.exports = function ( db ) {
    return db.define("category", {
        "cat_name"   : { "type": "string" },
        "cat_description"   : { "type": "string" }
        }, {
        "validations" : {
            "cat_name": function ( name, next ) {
                db._models.catgory.find ( { cat_name : name }, function ( res ) {
                    if ( res ) {
                        return next ( 'already used' );
                    } else {
                        return next ( ) ;
                    }
                } )
            }
        }
    });
};