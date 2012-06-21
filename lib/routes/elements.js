module.exports = function ( method, url, model, callback ) {
	if ( url === '/elements' ) {
		if ( method === 'GET' ) {
			handler.findAll ( model, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
			} );
		} else if ( method === 'DELETE' ) {
			handler.delAll ( models.authors, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
		}
	}
};