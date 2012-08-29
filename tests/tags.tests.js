var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Tags." );
	testThroughID ( model, handler );
	testThroughMap ( model, handler );
};

function testThroughID ( model, handler ) {
	console.log ( "> Through ID." );

	var testTag = {
		id : 666,
		tag_name : "testTag666",
	}
      , newTestTagName = "testTag666_Update"	

	// Try to read a non-existent user.
	handler.findOneByID ( model, testTag.id, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new user in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testTag ) );

	// Read the previously created user.
	handler.findOneByID ( model, testTag.id, function ( results ) {
		assert.equal ( results.message.content.tag_name, testTag.tag_name, "Update in testing session." );
	} );

	// Update the previously read user.
	handler.updateOneByID ( false, model, testTag.id, function ( results ) {
		
		// Read the previously updated user.
		handler.findOneByID ( model, testTag.id, function ( results ) {
			assert.equal ( results.message.content.tag_name, newTestTagName, "Update in testing session." );
		} );

		// Delete the previously read user.
		handler.delOneByID ( model, testTag.id, function ( results ) {
			
			// Read the previously deleted user.
			handler.findOneByID ( model, testTag.id, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { tag_name : newTestTagName } ) );
}

function testThroughMap ( model, handler ) {
	console.log ( "> Through Map." );
	
	var testTag = {
		id : 1337,
		tag_name : "testTag1337",
	}
      , newTestTagName = "testTag1337_Update";

	// Try to read a non-existent user.
	handler.findOneByMap ( model, { tag_name : testTag.tag_name }, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new user in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testTag ) );

	// Read the previously created user.
	handler.findOneByMap ( model, { tag_name : testTag.tag_name }, function ( results ) {
		assert.equal ( results.message.content.tag_name, testTag.tag_name, "Update in testing session." );
	} );

	// Update the previously read user.
	handler.updateOneByMap ( false, model, { tag_name : testTag.tag_name }, function ( results ) {
		
		// Read the previously updated user.
		handler.findOneByMap ( model, { tag_name : newTestTagName }, function ( results ) {
			assert.equal ( results.message.content.tag_name, newTestTagName, "Update in testing session." );
		} );

		// Delete the previously read user.
		handler.delOneByMap ( model, { tag_name : newTestTagName }, function ( results ) {
			
			// Read the previously deleted user.
			handler.findOneByMap ( model, { tag_name : newTestTagName }, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { tag_name : newTestTagName } ) );
}
