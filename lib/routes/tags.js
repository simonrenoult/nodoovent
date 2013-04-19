exports.route = function ( models, server, handler ) {
	
	var PATH;
		
	// ------------------------------------ //
	
	PATH = '/tags';
		
	server.get ( PATH, function ( req, res, next ) {
		handler.getAll ( models.tags, function ( tags ) {
			handler.readingSuccess ( tags, res , next );  
		} );
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		handler.saveOne ( models.tags, JSON.parse ( req.body ), function ( ) {
			handler.creationSuccess ( res, next );
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		handler.delAll ( models.tags, function ( ) {
			handler.deletionSuccess ( res, next );                
		} );
	} );
	
	// ------------------------------------ //
	
	PATH = '/tags/:noun';
	
	server.get ( PATH, function ( req, res, next ) {
		handler.getSome ( models.tags, { tag_name: req.params.noun }, function ( tags ) {
			handler.readingSuccess ( tags, res, next );                
		} );
	} );
	
	server.put ( PATH, function ( req, res, next ) {
		models.elements.find ( { where: { tag_name: req.params.noun } } )
		.success ( function ( tag ) {
			tag.updateAttributes ( JSON.parse ( req.body ) )
			.success ( function ( ) {
				handler.updateSuccess ( res, next );
			} );            
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		handler.delSome ( models.tags, { tag_name: req.params.noun }, function ( ) {
			handler.deletionSuccess ( res, next );
		} );
	} ); 
	
	// ------------------------------------ //
	
	PATH = '/elements/:title/tags';
	
	server.get ( PATH, function ( req, res, next ) {
		handler.getSome ( models.elements, { ele_name: req.params.title }, function ( elements ) {
			elements.getTags ( ).success ( function ( tags ) {
				handler.readingSuccess ( tags, res, next );
			} );
		} );
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		var addTagToElement = function ( tag ) {
			models.elements.all ( { where : { ele_name : req.params.title } } )
			.success ( function ( elements ) {
				for ( var e in elements ) {
					elements[e].addTag ( tag );
				}
				handler.creationSuccess ( res, next );		
			} );
		};
		
		models.tags.create ( JSON.parse ( req.body ) )
		.success ( function ( tag ) {
			addTagToElement ( tag );
		} )
		.error ( function ( err ) {
			models.tags.find ( { where : JSON.parse ( req.body ) } )
			.success ( function ( tag ) {
				addTagToElement ( tag );
			} );
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		models.elements.find ( { where: { use_name: req.params.title } } )
		.success ( function ( elements ) {
			for ( var e in elements ) {
				elements[e].setTags ( null );
			}
		} );
	} );
	
	// ------------------------------------ //
	
	PATH = '/users/:name/elements/:title/tags';
	
	server.get ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	// ------------------------------------ //
	
	PATH = '/users/:name/elements/:title/tags/:noun';
	
	server.get ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.put ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		// TODO
	} );
};
