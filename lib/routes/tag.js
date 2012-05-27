/*
 * Allowed routes :
 *
 *  /tags : tags list
 *  /tag/3 : tag whose id is 3
 *  /tag/family : tag whose name is javascript
 *
 * TODO :
 *
 *  /tag/7/elements : 7th tag elements
 *  /tag/javascript/elements : javascript tag elements
 *
 */

exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/tags/.test ( req.url ) ) {
            crud.findAll ( model, callback );
        } else if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/tag\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, { tag_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/tag$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/tag\/(\w+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, { tag_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/tag\/(\d+)$/.test ( req.url ) ) {
            crud.del ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/tag\/(\w+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, { tag_name: RegExp.$1 }, callback );
        } else if ( /^\/tags$/.test ( req.url ) ) {
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

