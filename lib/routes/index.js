/*
 * Modules requirements.
 */
var elements = require ( './elements.js' );

/*
 * This module detects the required resource and dispatches its processing
 * to the corresponding modules.  
 */
module.exports = function ( routes, req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );
    
    // Browse all the available resources (see conf.json file).
    for ( var resource in routes ) {
    	// As each of those resources is reachable through regular expressions,
    	// we browse these so we can test the url.
    	for ( var i = 0 ; i < routes[resource].length ; i++ ) {
    		if ( req.url.match ( routes[resource][i] ) ) {
    			// We shunt the client to the right module.
    			if ( resource === 'elements' ) {
    				elements ( req.method, req.url, models.elements, handler, callback );
    			} else if ( resource === 'authors' ) {
    				
    			} else if ( resource === 'tags' ) {
    				
    			}
    		}
    	}
    }
};
