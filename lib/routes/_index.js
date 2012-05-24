module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    if ( req.url.match ( /^\/author[s]?/ ) ) {
        require ( './author.js' ).route ( req, handler, models.author, callback );
    } else if ( req.url.match ( /^\/element[s]?/ ) ) {
        require ( './element.js' ).route ( req, handler, models.element, callback );
    } else if ( req.url.match ( /^\/tag[s]?/ ) ) {
        require ( './tag.js' ).route ( req, handler, models.tag, callback );
    } else if ( req.url.match ( /^\/category[s]?/ ) ) {
        require ( './category.js' ).route ( req, handler, models.category, callback );
    }
}