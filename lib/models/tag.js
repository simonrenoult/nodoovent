module.exports = function ( db ) {
    return db.define("tag", {
        "tag_name"   : { "type": "string" }
        }, {
        "validations" : {
            "tag_name": function ( name, next ) {
                db._models.tag.find ( { tag_name : name }, function ( res ) {
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