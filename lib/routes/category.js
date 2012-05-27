/*
 * Allowed routes :
 *
 *  /categories : category list
 *  /category/3 : category whose id is 3
 *  /category/family : category whose name is tom
 *
 * TODO :
 *
 *  /category/7/elements : 7th catgory elements
 *  /category/family/elements : family category elements
 *
 */

exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/categories$/.test ( req.url ) ) {
            crud.findAll ( model, callback );
        } else if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/category\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, { cat_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/category$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/category\/(\w+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, { cat_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/category\/(\d+)$/.test ( req.url ) ) {
            crud.del ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/category\/(\w+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, { cat_name: RegExp.$1 }, callback );
        } else if ( /^\/categories$/.test ( req.url ) ) {
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

