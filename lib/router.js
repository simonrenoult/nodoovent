module.exports = function ( req, res, handler ) {
    console.log ( req.method + ' ' + req.url );
	switch ( req.method ) {
        case 'GET' :
            read ( handler, req, res );
            break;
        case 'POST' :
            create ( handler, req, res );
            break;
        case 'PUT' :
            update ( handler, req, res );
            break;
        case 'DELETE' :
            remove ( handler, req, res );
            break;
        default :
	}
};

function read ( handler, req, res ) {
    var id, requiredResource;
    if ( id = req.url.match ( /^\/author\/([0-9]+)$/ ) ) {
       
    }

}
