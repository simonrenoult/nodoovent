var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Groups." );
	testThroughID ( model, handler );
	testThroughMap ( model, handler );
};

function testThroughID ( model, handler ) {
    console.log ( "> Through ID." );

    var testGroup = {
            id : 666,
            grp_name: "Group666"
    };

    // Try to read a non-existent comment.
    handler.findOneByID ( model, testGroup.id, function ( results ) {
        assert.equal ( results.message.content, null, "[Groups] This tuple already exists within the database." );

        // Create a new comment in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created comment.
            handler.findOneByID ( model, testGroup.id, function ( results ) {
                assert.equal ( results.message.content.grp_name, testGroup.grp_name, "[Groups] Update in testing session." );

                // Update the previously read comment.
                handler.updateOneByID ( false, model, testGroup.id, function ( results ) {

                        // Read the previously updated comment.
                        handler.findOneByID ( model, testGroup.id, function ( results ) {
                            assert.equal ( results.message.content.grp_name, "TestGroup666_Update", "Update in testing session." );

                            // Delete the previously read comment.
                            handler.delOneByID ( model, testGroup.id, function ( results ) {
                                // Read the previously deleted comment.
                                handler.findOneByID ( model, testGroup.id, function ( results ) {
                                        assert.equal ( results.message.content, null );
                                } );
                            } );
                        } );
                }, JSON.stringify ( {grp_name : "TestGroup666_Update"} ) );
            } );
        }, JSON.stringify ( testGroup ) );
    } );
}

function testThroughMap ( model, handler ) {
    console.log ( "> Through Map." );

    var testGroup = {
            id : 1337,
            grp_name: "ContentGroup1337"
        }
        , newTestGroupContent = "TestGroup1337_Update"

    // Try to read a non-existent comment.
    handler.findOneByMap ( model, {grp_name : testGroup.grp_name}, function ( results ) {
        assert.equal ( results.message.content, null, "[Groups] This tuple already exists within the database." );
        
        // Create a new comment in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created comment.
            handler.findOneByMap ( model, {grp_name : testGroup.grp_name}, function ( results ) {
                assert.equal ( results.message.content.grp_name, testGroup.grp_name, "[Groups] Update in testing session." );

                // Update the previously read comment.
                handler.updateOneByMap ( false, model, {grp_name : testGroup.grp_name}, function ( results ) {
                        // Read the previously updated comment.
                        handler.findOneByMap ( model, {grp_name : newTestGroupContent}, function ( results ) {
                            assert.equal ( results.message.content.grp_name, newTestGroupContent, "[Groups] Update in testing session." );

                            // Delete the previously read comment.
                            handler.delOneByMap ( model, {grp_name : newTestGroupContent}, function ( results ) {
                                // Read the previously deleted comment.
                                handler.findOneByMap ( model, {grp_name : newTestGroupContent}, function ( results ) {
                                        assert.equal ( results.message.content, null );
                                } );
                            } );    
                        } );
                }, JSON.stringify ( {grp_name : newTestGroupContent} ) );
            } );
        }, JSON.stringify ( testGroup ) );
    } );
}
