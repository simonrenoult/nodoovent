exports.initialize = function ( db ) {
    /*
     * Define models
     */

    var Author = db.define ( "author", {
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
                } )
            }
        }
    });

    var Category = db.define("category", {
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

    var Tag = db.define("tag", {
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

    var Element = db.define("element", {
        "ele_name"   : { "type": "string" },
        "ele_content"   : { "type": "string" },
        "ele_data_creation"   : { "type": "date" }
    });

    Element.hasMany ( "authors", db._models.author, "author" );
    Element.hasMany ( "tags", db._models.tag, "tag" );
    Element.hasOne ( "category", db._models.category );

    Tag.sync ( );
    Category.sync ( );
    Author.sync ( );
    Element.sync ( );
}