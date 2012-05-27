module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    if ( req.url === '/' ) {
         // TODO Send API description as content.
        callback ( {code: 200, content: {OK: true}} );
    } else if ( /^\/author[s]?/.test ( req.url ) ) {
        require ( './author.js' ).route ( req, handler, models.author, callback );
    } else if ( /^\/element[s]?/.test ( req.url ) ) {
        require ( './element.js' ).route ( req, handler, models.element, callback );
    } else if ( /^\/tag[s]?/.test ( req.url ) ) {
        require ( './tag.js' ).route ( req, handler, models.tag, callback );
    } else if ( /^\/(category|categories)/.test ( req.url ) ) {
        require ( './category.js' ).route ( req, handler, models.category, callback );
    }
};