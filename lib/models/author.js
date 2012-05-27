module.exports = function ( db ) {
    return db.define ( "author", {
        "aut_name": { "type": "string" }
    } );
}