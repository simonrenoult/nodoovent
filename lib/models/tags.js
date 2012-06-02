module.exports = function ( db ) {
    return db.define ( "tags", {
        "tag_name"   : { "type": "string" }
    } );
};