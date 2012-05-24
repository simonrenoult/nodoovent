module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    if ( req.url.match ( /^\/author/ ) ) {
        require ( './author.js' ).route ( req, handler, models.author, callback );
    } else if ( req.url.match ( /^\/element/ ) ) {
        require ( './lib/routes/element.js' ).route ( req, handler, models.element, callback );
    } else if ( req.url.match ( /^\/tag/ ) ) {
        require ( './lib/routes/tag.js' ).route ( req, handler, models.tag, callback );
    } else if ( req.url.match ( /^\/category/ ) ) {
        require ( './lib/routes/category.js' ).route ( req, handler, models.category, callback );
    }
}