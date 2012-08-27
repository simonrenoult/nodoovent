var assert = require ( 'assert' );

module.exports = function ( conf, model, handler ) {
	var testElement = {
		id : 666,
		ele_name : "Testing element",
		ele_content : "Testing element content."
	}

	console.log ( "\nTesting session upcoming..." );

	// Try to read a non-existent element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		console.log ( "1 - " + JSON.stringify ( results ) );
	} );
	// Create a new element in the database.
	handler.saveOne ( testElement, model, function ( results ) {
		console.log ( "2 - " + JSON.stringify ( results ) );
	} );
	// Read the previously created element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		console.log ( "3 - " + JSON.stringify ( results ) );
	} );
	// Update the previously read element.
	handler.updateOneByID ( { ele_name : "Update name."}, model, testElement.id, function ( results) {
		console.log ( "4 - " + JSON.stringify ( results ) );
	} );
	// Read the previously updated element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		console.log ( "5 - " + JSON.stringify ( results ) );
	} );
	// Delete the previously read element.
	handler.delOneByID ( model, testElement.id, function ( results ) {
		console.log ( "6 - " + JSON.stringify ( results ) );
	} );
	// Read the previously deleted element.
	handler.findOneByID ( model, testElement.id, function ( results ) {
		console.log ( "7 - " + JSON.stringify ( results ) );
	} );
}
