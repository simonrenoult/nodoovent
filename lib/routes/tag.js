exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        var occ;
        if ( occ = req.url.match ( /^\/tag\/([0-9]+)/ ) ) {
            crud.get ( model, occ[1], callback );
        }
    } else if ( req.method === 'POST' ) {
        crud.post ( req, model, callback );
    } else if ( req.method === 'PUT' ) {
        var occ;
        if ( occ = req.url.match ( /^\/tag\/([0-9]+)/ ) ) {
            crud.put ( req, model, occ[1], callback );
        }
    } else if ( req.method === 'DELETE' ) {
        var occ;
        if ( occ = req.url.match ( /^\/tag\/([0-9]+)/ ) ) {
            crud.del ( model, occ[1], callback );
        }
    }
};

