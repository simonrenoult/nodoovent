module.exports = function ( db ) {
    return db.define("element", {
        "ele_name"   : { "type": "string" },
        "ele_content"   : { "type": "string" },
        "ele_data_creation"   : { "type": "date" }
    });
};