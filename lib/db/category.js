this.Category = null;

exports.initialize = function ( db ) {
	this.Category = db.define("category", {
		"cat_name"   : { "type": "string" },
		"cat_description"   : { "type": "string" }
	});

	return this.Category;
};

exports.Category = this.Category;