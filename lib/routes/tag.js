exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/tag\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, 'tag_name', RegExp.$1, callback );
        } else if ( /^\/tags$/.test ( req.url ) ) {
            crud.getAll ( model, callback );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/author$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, callback );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, callback );
        }
    }
};

