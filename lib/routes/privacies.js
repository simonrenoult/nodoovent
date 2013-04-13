module.exports = function ( req, handler, model, route, callback ) {
    if ( /^\/privacies\/?$/.test ( req.url ) ) {
        if ( req.method === "GET" ) {
            handler.findAll ( model, callback );
        } else {
            callback ( resStructure ( 405, false, "Method is not authorized." ) );
        }
    } else if ( /^\/privacies\/([0-9]+)\/?$/.test ( req.url ) ) {
        if ( req.method === 'GET' ) {
            handler.findOneByID ( model, parseInt ( RegExp.$1 ), callback );
        } else {
            callback ( resStructure ( 405, false, "Method is not authorized." ) );
        }
    } else {
        callback ( resStructure ( 404, false, "Unknown route." ) );
    }	
};