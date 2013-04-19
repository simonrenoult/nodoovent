var ElementsHandler = require ( __dirname + '/../handlers/elements.js' );

exports.route = function ( models, server ) {
	
	var handler = new ElementsHandler ( models )
	  , PATH;
	
	// ------------------------------------ //
	
	PATH = '/elements';
	
	server.get ( PATH, function ( req, res, next ) {
		handler.getAll ( function ( elements ) {
			handler.readingSuccess ( elements, res , next );  
		} );
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		handler.saveOne ( JSON.parse ( req.body ), function ( ) {
			handler.creationSuccess ( res, next );
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		handler.delAll ( function ( ) {
			handler.deletionSuccess ( res, next );                
		} );
	} );
	
	// ------------------------------------ //

	PATH = '/elements/:title';
	
	server.get ( PATH, function ( req, res, next ) {
		handler.getSome ( { ele_name: req.params.title }, function ( elements ) {
			handler.readingSuccess ( elements, res, next );    
		} );
	} );
	
	server.put ( PATH, function ( req, res, next ) {
		handler.getSome ( { ele_name: req.params.title }, function ( elements ) {
			/*
			element.updateAttributes ( JSON.parse ( req.body ) )
			.success ( function ( ) {
				handler.updateSuccess ( res, next );
			} ); 
			*/
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		handler.delSome ( { ele_name: req.params.title }, function ( ) {
			handler.deletionSuccess ( res, next );
		} );
	} ); 
	
	// ------------------------------------ //
	
	PATH = '/users/:name/elements';
	
	server.get ( PATH, function ( req, res, next ) {
		handler.getOne ( { use_name: req.params.name }, function ( user ) {
			user.getElements ( ).success ( function ( elements ) {
				handler.readingSuccess ( elements, res, next );
			} );
		} );
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		handler.getOne ( { use_name: req.params.name }, function ( user ) {
			handler.createWithAuthor ( JSON.parse ( req.body ), user, function ( ) {
				handler.creationSuccess ( res, next );
			} ); 
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		handler.getOne ( { use_name: req.params.name }, function ( user ) {
			handler.delFromUser ( user, function ( ) {
				handler.deletionSuccess ( res, next );
			} );
		} );
	} );
	
	// ------------------------------------ //
	
	PATH = '/users/:name/elements/:title';
	
	server.get ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name: req.params.name } } )
		.success ( function ( user ) {
			user.getElements ( { where : { ele_name: req.params.title } } )
			.success ( function ( elements ) {
				handler.readingSuccess ( elements, res, next );
			} )
		} );
	} );
	
	server.put ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name: req.params.name } } )
		.success ( function ( user ) {
			user.getElements ( { where : { ele_name: req.params.title } } )
			.success ( function ( elements ) {
				for ( var e in elements ) {
					elements[e].updateAttributes( JSON.parse ( req.body ) );
				}
				
				handler.updateSuccess ( res, next );
			} )
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name: req.params.name } } )
		.success ( function ( user ) {
			user.getElements ( { where : { ele_name: req.params.title } } )
			.success ( function ( elements ) {
				for ( var e in elements ) {
					elements[e].destroy ( );
				}
				
				handler.deletionSuccess ( res, next );
			} )
		} );
	} );
	
	// ------------------------------------ //
	
	PATH = '/tags/:noun/elements';
	
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
	
	// /users/g4llic4/tags/js/elements
	PATH = '/users/:name/tags/:noun/elements';
	
	server.get ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		// TODO
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		// TODO
	} );
};
