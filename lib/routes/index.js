/*
 * Modules requirements.
 */
var elements = require ( './elements.js' )
  , users = require ( './users.js' )
  , tags = require ( './tags.js' )
  , status = require ( './status.js' );

/*
 * This module detects the required resource and dispatches its processing
 * to the corresponding modules.
 * 
 * @param routes {Object} Allowed routes (see conf.json).
 * @param req {Object} Client request object.
 * @param handler {Module} Module dedicated to the handling of a request.
 * @param models {Object} Models corresponding to the api resources.
 * @param callback {Function} Function to return once the request is satisfied.
 */
module.exports = function ( resources, req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );
    
    // Browse all the available resources (see conf.json file).
    for ( var resource in resources ) {
    	// Each resource is reachable through different url (defined by a regex).
    	for ( var i = 0 ; i < resources[resource].length ; i++ ) {
    		// Each regex admits some access (GET | DELETE | POST | PUT).
    		for ( var regex in resources[resource][i] ) {
    			if ( req.url.match ( regex ) ) {
    				// We shunt the client to the right module.
					if ( resource === 'comments' ) {
						// TODO
					} else if ( resource === 'elements' ) {
						elements ( req, handler, models, resources[resource][i], callback );
					} else if ( resource === 'status' ) {
						status ( req, handler, models.status, resources[resource][i], callback );
					} else if ( resource === 'tags' ) {
						tags ( req, handler, models.tags, resources[resource][i], callback );
					} else if ( resource === 'users' ) {
						users ( req, handler, models.users, resources[resource][i], callback );
					}
				}
    		}
    	}
    }
};
