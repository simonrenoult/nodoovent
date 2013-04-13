var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Tags." );
	testThroughID ( model, handler );
};

function testThroughID ( model, handler ) {
    console.log ( "> Through ID." );

    var testTag = {
        //id : 666,
        tag_name : "testTag666"
    }
    , newTestTagName = "testTag666_Update";	

    // Try to read a non-existent user.
    handler.findOneByID ( model, testTag.tag_name, function ( results ) {
        assert.equal ( results.message.content, null, "[Tags] This tuple already exists within the database." );

        // Create a new user in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created user.
            handler.findOneByID ( model, testTag.tag_name, function ( results ) {
                assert.equal ( results.message.content.tag_name, testTag.tag_name, "[Tags] Update in testing session." );
                
                // Delete the previously read user.
                handler.delOneByID ( model, testTag.tag_name, function ( results ) {

                    // Read the previously deleted user.
                    handler.findOneByID ( model, testTag.tag_name, function ( results ) {
                        assert.equal ( results.message.content, null );
                    } );
                } );
            } );
        }, JSON.stringify ( testTag ) );
    } );
}
