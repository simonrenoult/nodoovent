var assert = require ( 'assert' );

module.exports = function ( conf, model, handler ) {
	var timeout = 1000
	  , testElement = {
		id : 666,
		ele_name : "Testing element",
		ele_content : "Testing element content."
	};

	console.log ( "\nTesting elements." );

	// Try to read a non-existent element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		assert.equal ( results.message.content, null, "This testing item already exist within the database." );
	} );

	// Create a new element in the database.
	handler.saveOne ( false, model, function ( results ) {
	}, JSON.stringify ( testElement ) );

	// Read the previously created element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		assert.equal ( results.message.content.id, testElement.id, "This testing item can't be find." );
	} );

	// Update the previously read element.
	handler.updateOneByID ( false, model, testElement.id, function ( results) {
		
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
