module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );
    if ( /^\/authors(?:\/(\d+|\w+))?$/ ) {
        require ( './author.js' ) ( req, handler, models, callback );
    }
};

