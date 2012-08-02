var elements = require ( './elements.js' );

module.exports = function ( routes, req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );
    
    for ( var r in routes ) {
    	for ( var i = 0 ; i < routes[r].length ; i++ ) {
    		if ( req.url.match ( routes[r][i] ) ) {
    			if ( r === 'elements' ) {
    				elements ( req.method, req.url, models.elements, handler, callback );
    			} else if ( r === 'authors' ) {
    				
    			} else if ( r === 'tags' ) {
    				
    			}
    		}
    	}
    }
};
