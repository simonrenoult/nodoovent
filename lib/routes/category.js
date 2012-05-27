exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/category\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, 'cat_name', RegExp.$1, callback );
        }  else if ( /^\/categories/.test ( req.url ) ) {
            crud.getAll ( model, callback );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/category$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, callback );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, callback );
        }
    }
};

