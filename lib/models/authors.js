module.exports = function ( db ) {
    return db.define ( "authors", {
        "aut_name": { "type": "string" },
        "aut_password": { "type": "string" }
    } );
}