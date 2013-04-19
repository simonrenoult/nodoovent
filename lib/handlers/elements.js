var Handler = require ( __dirname + '/index.js' )
  , util = require( 'util' );
  
function ElementHandler ( model ) {
	this.model = model;
}

util.inherits ( ElementHandler, Handler );

ElementHandler.prototype.createWithAuthor = function ( content, author, next ) {
	this.model.create ( content )
	.success ( function ( element ) {
		element.setAuthor ( author );
		user.addElement ( element ).success ( next );
	} );
};

ElementHandler.prototype.delFromUser = function ( author, next ) {
	author.getElements ( ).success ( function ( elements ) {
		for ( var element in elements ) {
			elements[element].destroy ( );
		}
		
		return next ( );
	} );
};

module.exports = ElementHandler;