module.exports = function ( req, handler, models, callback ) {
    if ( req.method === 'GET' ) {
        if ( /^\/authors(?:\/(\d+|\w+))?$/.test ( req.url ) ) {
            if ( !RegExp.$1 ) {
                handler.findAll ( models.author, callback );
            }
        }
    } else if ( req.method === 'POST' ) {

    } else if ( req.method === 'PUT' ) {

    } else if ( req.method === 'DELETE' ) {

    } else {

    }
};

