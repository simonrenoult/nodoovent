exports.initialize = function ( db ) {
    /*
     * Define models
     */

    var Author = db.define ( "author", {
        "aut_name"   : { "type": "string" }
        }, {
        "methods" : {
            "fullName" :function () {
                return this.aut_name;
            }
        }
    });

    var Category = db.define("category", {
        "cat_name"   : { "type": "string" },
        "cat_description"   : { "type": "string" }
    });

    var Tag = db.define("tag", {
        "tag_name"   : { "type": "string" }
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