module.exports = function ( req, handler, model, route, callback ) {
	if ( /^\/users\/?$/.test ( req.url ) ) {
		if ( req.method === "GET" ) {
			handler.findAll ( model, callback );
		} else if ( req.method === "DELETE" ) {
			handler.delAll ( model, callback );
		} else if ( req.method === 'POST' ) {
			handler.saveOne ( req, model, callback );
		} else {
			// TODO Method is not found.
		}
	} else if ( /^\/users\/([0-9]+)\/?$/.test ( req.url ) ) {
		if ( req.method === 'GET' ) {
			handler.findOneByID ( model, parseInt ( RegExp.$1 ), callback );
		} else if ( req.method === 'DELETE' ) {
			handler.delOneByID ( model, parseInt ( RegExp.$1 ), callback );
		} else if ( req.method === 'PUT' ) {
			handler.updateOneByID ( req, model, parseInt ( RegExp.$1 ), callback );
		} else {
			// TODO Method is not found.
		}
	} else if ( /^\/users\/([A-Za-z0-9.-_]+)\/?$/.test ( req.url ) ) {
		if ( req.method === 'GET' ) {
			handler.findOneByMap ( model, { "use_name" : RegExp.$1 }, callback );
		} else if ( req.method === 'DELETE' ) {
			handler.delOneByMap ( model, { "use_name" : RegExp.$1 }, callback );
		} else if ( req.method === 'PUT' ) {
			handler.updateOneByMap ( req, model, { "use_name" : RegExp.$1 }, callback );
		} else {
			// TODO Method is not found.
		}
	} else {
		// TODO URL is unknown.
	}
};
