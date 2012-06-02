module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    if ( /^\/authors(?:\/(\d+|\w+))?$/.test ( req.url ) ) {
        console.log ( RegExp.$1 );
        require ( './author.js' ) ( req, handler, models, RegExp.$1, callback );
    }
};

