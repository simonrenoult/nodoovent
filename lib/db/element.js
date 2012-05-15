this.Element = null;

exports.initialize = function ( db ) {
	this.Element = db.define("element", {
		"ele_name"   : { "type": "string" },
		"ele_content"   : { "type": "string" },
		"ele_data_creation"   : { "type": "date" }
	});

    this.Element.hasMany ( "authors", db._models.author, "author" );
    this.Element.hasMany ( "tags", db._models.tag, "tag" );
    this.Element.hasOne ( "category", db._models.category );

	return this.Element;
};

exports.Element = this.Element;