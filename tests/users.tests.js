var assert = require ( 'assert' );

module.exports = function ( conf, model, handler ) {
	console.log ( "-- > Users." );
	
	var timeout = 1000
	  , testUser = {
		id : 666,
		use_name : "TestUser",
		use_password : "password",
	};

	// Try to read a non-existent user.
	handler.findOneByID ( model, testUser.id, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new user in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testUser ) );

	// Read the previously created user.
	handler.findOneByMap ( model, { use_name : testUser.use_name }, function ( results ) {
		assert.equal ( results.message.content.id, testUser.id, "This tuple can't be find through its name." );
	} );

	// Update the previously read user.
	handler.updateOneByID ( false, model, testUser.id, function ( results ) {
		
		// Read the previously updated user.
		handler.findOneByID ( model, testUser.id, function ( results ) {
			assert.equal ( results.message.content.use_name, "Update in testing session." );
		} );

		// Delete the previously read user.
		handler.delOneByID ( model, testUser.id, function ( results ) {
			
			// Read the previously deleted user.
			handler.findOneByID ( model, testUser.id, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { use_name : "Update in testing session." } ) );
}
