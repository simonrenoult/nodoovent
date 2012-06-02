module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    if ( /^\/authors(\/(\d+|\w+))?$/.test ( req.url ) ) {
        require ( './authors.js' ) ( req, handler, models, RegExp.$2, callback );
    }
};

