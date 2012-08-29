var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Elements." );
	console.log ( "> Through ID." );
	
	var testElement = {
		id : 666,
		ele_name : "Testing element",
		ele_content : "Testing element content."
	};

	// Try to read a non-existent element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		assert.equal ( results.message.content, null, "This tuple already exists within the database." );
	} );

	// Create a new element in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testElement ) );

	// Read the previously created element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		assert.equal ( results.message.content.id, testElement.id, "This tuple can't be find." );
	} );

	// Update the previously read element.
	handler.updateOneByID ( false, model, testElement.id, function ( results ) {
		
		// Read the previously updated element.
		handler.findOneByID ( model, testElement.id, function ( results ) {
			assert.equal ( results.message.content.ele_name, "Update in testing session." );
		} );

		// Delete the previously read element.
		handler.delOneByID ( model, testElement.id, function ( results ) {
			
			// Read the previously deleted element.
			handler.findOneByID ( model, testElement.id, function ( results ) {
				assert.equal ( results.message.content, null );
			} );
		} );
	}, JSON.stringify ( { ele_name : "Update in testing session." } ) );
}
