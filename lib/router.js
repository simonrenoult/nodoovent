module.exports = function ( req, res, handler ) {
	console.log ( req.method );

	switch ( req.method ) {
        case 'POST' :
            handler.post ( req, res );
            break;
        case 'GET' :
            handler.get ( req, res );
            break;
        case 'PUT' :
            handler.put ( req, res );
            break;
        case 'DELETE' :
            handler.delete ( req, res );
            break;
        default :

	}
};
