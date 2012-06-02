module.exports = function ( db ) {
    return db.define ( "elements", {
        "ele_name"   : { "type": "string" },
        "ele_content"   : { "type": "string" },
        "ele_status"   : { "type": "boolean" },
        "ele_date_creation"   : { "type": "date" }
    } );
};