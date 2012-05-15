this.Tag = null ;

exports.initialize = function ( db ) {
	this.Tag = db.define("tag", {
		"tag_name"   : { "type": "string" }
	});

	return this.Tag;
};

exports.Tag = this.Tag;