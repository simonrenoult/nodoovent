var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Users." );
	testThroughID ( model, handler );
	testThroughMap ( model, handler );
};

function testThroughID ( model, handler ) {
	console.log ( "> Through ID." );

	var testUser = {
		id : 666,
		use_name : "TestUser666",
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
	handler.findOneByID ( model, testUser.id, function ( results ) {
		assert.equal ( results.message.content.use_name, testUser.use_name, "Update in testing session." );
	} );

	// Update the previously read user.
	handler.updateOneByID ( false, model, testUser.id, function ( results ) {
		
		// Read the previously updated user.
		handler.findOneByID ( model, testUser.id, function ( results ) {
			assert.equal ( results.message.content.use_name, "TestUser666_Update", "Update in testing session." );
		} );

		// Delete the previously read user.
		handler.delOneByID ( model, testUser.id, function ( results ) {
			
			// Read the previously deleted user.
			handler.findOneByID ( model, testUser.id, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { use_name : "TestUser666_Update" } ) );
}

function testThroughMap ( model, handler ) {
	console.log ( "> Through Map." );
	
	var testUser = {
		id : 1337,
		use_name : "TestUser1337",
		use_password : "password",
	}
	  , newTestUserName = "TestUser1337_Update"

	// Try to read a non-existent user.
	handler.findOneByMap ( model, { use_name : testUser.use_name }, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new user in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testUser ) );

	// Read the previously created user.
	handler.findOneByMap ( model, { use_name : testUser.use_name }, function ( results ) {
		assert.equal ( results.message.content.use_name, testUser.use_name, "Update in testing session." );
	} );

	// Update the previously read user.
	handler.updateOneByMap ( false, model, { use_name : testUser.use_name }, function ( results ) {
		
		// Read the previously updated user.
		handler.findOneByMap ( model, { use_name : newTestUserName }, function ( results ) {
			assert.equal ( results.message.content.use_name, newTestUserName, "Update in testing session." );
		} );

		// Delete the previously read user.
		handler.delOneByMap ( model, { use_name : newTestUserName }, function ( results ) {
			
			// Read the previously deleted user.
			handler.findOneByMap ( model, { use_name : newTestUserName }, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { use_name : newTestUserName } ) );
}
