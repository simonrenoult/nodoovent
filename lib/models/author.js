module.exports = function ( db ) {
     return db.define ( "author", {
        "aut_name": { "type": "string" }
        }, {
        "validations" : {
            "aut_name": function ( name, next ) {
                db._models.author.find ( { aut_name : name }, function ( res ) {
                    if ( res ) {
                        return next ( 'already used' );
                    } else {
                        return next ( ) ;
                    }
                } );
            }
        }
    });
}