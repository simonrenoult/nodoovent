var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Status." );
	console.log ( "> Through ID." );
	
	var testStatus = {
		id : 666,
		sta_name : "Testing status",
	};

	// Try to read a non-existent element.
	handler.findOneByID ( model, testStatus.id, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new element in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testStatus ) );

	// Read the previously created element.
	handler.findOneByID ( model, testStatus.id, function ( results ) {
		assert.equal ( results.message.content.id, testStatus.id, "This tuple can't be find." );
	} );

	// Update the previously read element.
	handler.updateOneByID ( false, model, testStatus.id, function ( results ) {
		
		// Read the previously updated element.
		handler.findOneByID ( model, testStatus.id, function ( results ) {
			assert.equal ( results.message.content.sta_name, "Update in testing session." );
		} );

		// Delete the previously read element.
		handler.delOneByID ( model, testStatus.id, function ( results ) {
			
			// Read the previously deleted element.
			handler.findOneByID ( model, testStatus.id, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { sta_name : "Update in testing session." } ) );
}
