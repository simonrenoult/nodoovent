exports.route = function ( models, server, handler ) {
	var PATH;
	
	// ------------------------------------//
	
	PATH = '/users';
	
	server.get ( PATH, function ( req, res, next ) {
		models.users.all ( )
		.success ( function ( users ) {
			handler.readingSuccess ( users, res, next );                
		} );
	} );
	
	server.post ( PATH, function ( req, res, next ) {
		models.users.build ( JSON.parse ( req.body ) ).save()
		.success ( function ( ) {
			handler.creationSuccess ( res, next );
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		models.users.all ( )
		.success ( function ( elements ) {
			for ( var element in elements ) {
				elements[element].destroy ( );
			}
			
			handler.deletionSuccess ( res, next );                
		} );
	} );
	
	// ------------------------------------//

	PATH = '/users/:name';
	
	server.get ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name : req.params.name } } )
		.success ( function ( user ) {
			handler.readingSuccess ( user, res, next );                
		} );
	} );
	
	server.put ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name : req.params.name } } )
		.success ( function ( user ) {
			user.updateAttributes ( req.params )
			.success ( function ( ) {
				handler.updateSuccess ( res, next );
			} );             
		} );
	} );
	
	server.del ( PATH, function ( req, res, next ) {
		models.users.find ( { where: { use_name : req.params.name } } )
		.success ( function ( user ) {
			user.destroy ( )
			.success ( function ( ) {
				handler.deletionSuccess ( res, next );
			} );
		} );
	} );
	
	// ------------------------------------//

	PATH = '/elements/:title/users';

};
