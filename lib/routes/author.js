/*
 * Allowed routes :
 *
 *  /authors : author list
 *  /author/3 : author whose id is 3
 *  /author/tom : author whose name is tom
 *
 * TODO :
 *
 *  /author/3/elements
 *  /author/tom/elements
 *  
 */

exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/authors$/.test ( req.url ) ) {
            crud.findAll ( model, callback );
        } else if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/author\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, { aut_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/author$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/author\/(\w+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, { aut_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/author\/(\d+)$/.test ( req.url ) ) {
            crud.del ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/author\/(\w+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, { aut_name: RegExp.$1 }, callback );
        } else if ( /^\/authors$/.test ( req.url ) ) {
            crud.delAll ( model, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else {
        callback ( {
            code: 400,
            content: { OK: false }
        } );
    }
};

