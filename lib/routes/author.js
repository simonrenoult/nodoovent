exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/author\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, 'aut_name', RegExp.$1, callback );
        } else if ( /^\/authors$/.test ( req.url ) ) {
            crud.getAll ( model, callback );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/author$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, callback );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, callback );
        }
    }
};

