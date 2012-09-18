module.exports = function ( req, handler, models, route, callback ) {
	if ( /^\/elements\/?$/.test ( req.url ) ) {
		if ( req.method === "GET" ) {
			handler.findAll ( models.elements, callback );
		} else if ( req.method === "DELETE" ) {
			handler.delAll ( models.elements, callback );
		} else if ( req.method === 'POST' ) {
			handler.saveOne ( req, models.elements, callback );
		} else {
		    callback ( resStructure ( 405, false, "Method is not authorized." ) );
		}
	} else if ( /^\/elements\/([0-9]+)\/?$/.test ( req.url ) ) {
		if ( req.method === 'GET' ) {
			handler.findOneByID ( models.elements, parseInt ( RegExp.$1 ), callback );
		} else if ( req.method === 'DELETE' ) {
			handler.delOneByID ( models.elements, parseInt ( RegExp.$1 ), callback );
		} else if ( req.method === 'PUT' ) {
			handler.updateOneByID ( req, models.elements, parseInt ( RegExp.$1 ), callback );
		} else {
		    callback ( resStructure ( 405, false, "Method is not authorized." ) );
		}
	} else if ( /^\/users\/elements\/?$/.test ( req.url ) ) {
		if ( req.method === 'GET' ) {
			handler.findAll ( models.users, function ( users ) {
				var elementsList = {};
				for ( var user in users.message.content ) {
					users.message.content[user].getElements ( ).success ( function ( associatedElements ) {
						var elements = JSON.parse ( JSON.stringify ( associatedElements ) );
						elementsList[users.message.content[user].use_name] = elements;
						console.log ( elementsList );
					} );
				}
			} );
		} else if ( req.method === 'DELETE' ) {
		
		} else {
		
		}
	} else {
		callback ( resStructure ( 404, false, "Unknown route." ) );
	}	
};
