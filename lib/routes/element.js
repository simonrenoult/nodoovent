/*
 * Allowed routes :
 *
 *  /elements : element list
 *  /element/3 : element whose id is 3
 *  /element/todo : element whose name is todo
 *
 * TODO :
 *
 *  /elements/author/3
 *  /elements/author/tom
 *
 *  /elements/author/3/tag/7
 *  /elements/author/tom/tag/7
 *
 *  /elements/author/3/tags
 *  /elements/author/tom/tags
 *
 *  /elements/author/3/tag/javascript
 *  /elements/author/tom/tag/javascript
 *
 *  /elements/author/3/category/2
 *  /elements/author/tom/category/2
 *
 *  /elements/tag/3
 *  /elements/tag/javascript
 *
 *  /elements/category/7
 *  /elements/category/family
 *
 *  /element/7/tags : 7th element tags
 *  /element/7/category : element category
 *  /element/7/author : element author
 *
 */

exports.route = function ( req, crud, model, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/elements$/.test ( req.url ) ) {
            crud.findAll ( model, callback );
        } else if ( /^\/element\/(\d+)$/.test ( req.url ) ) {
            crud.get ( model, RegExp.$1, callback );
        } else if ( /^\/element\/(\w+)$/.test ( req.url ) ) {
            crud.find ( model, { ele_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'POST' ) {
        if ( /^\/element$/.test ( req.url ) ) {
            crud.post ( req, model, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'PUT' ) {
        if ( /^\/element\/(\d+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/element\/(\w+)$/.test ( req.url ) ) {
            crud.put ( req, model, RegExp.$1, { ele_name: RegExp.$1 }, callback );
        } else {
            callback ( {
                code: 400,
                content: { OK: false }
            } );
        }
    } else if ( req.method === 'DELETE' ) {
        if ( /^\/element\/(\d+)$/.test ( req.url ) ) {
            crud.del ( req, model, RegExp.$1, RegExp.$1, callback );
        } else if ( /^\/element\/(\w+)$/.test ( req.url ) ) {
            crud.del ( model, RegExp.$1, { ele_name: RegExp.$1 }, callback );
        } else if ( /^\/elements$/.test ( req.url ) ) {
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

