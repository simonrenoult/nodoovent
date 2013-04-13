var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
	console.log ( "-- > Comments." );
	testThroughID ( model, handler );
	testThroughMap ( model, handler );
};

function testThroughID ( model, handler ) {
    console.log ( "> Through ID." );

    var testComment = {
            id : 666,
            com_content: "ContentContent666"
    };

    // Try to read a non-existent comment.
    handler.findOneByID ( model, testComment.id, function ( results ) {
        assert.equal ( results.message.content, null, "[Comments] This tuple already exists within the database." );

        // Create a new comment in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created comment.
            handler.findOneByID ( model, testComment.id, function ( results ) {
                assert.equal ( results.message.content.com_content, testComment.com_content, "[Comments] Update in testing session." );

                // Update the previously read comment.
                handler.updateOneByID ( false, model, testComment.id, function ( results ) {

                        // Read the previously updated comment.
                        handler.findOneByID ( model, testComment.id, function ( results ) {
                            assert.equal ( results.message.content.com_content, "TestComment666_Update", "Update in testing session." );

                            // Delete the previously read comment.
                            handler.delOneByID ( model, testComment.id, function ( results ) {
                                // Read the previously deleted comment.
                                handler.findOneByID ( model, testComment.id, function ( results ) {
                                        assert.equal ( results.message.content, null );
                                } );
                            } );
                        } );
                }, JSON.stringify ( {com_content : "TestComment666_Update"} ) );
            } );
        }, JSON.stringify ( testComment ) );
    } );
}

function testThroughMap ( model, handler ) {
    console.log ( "> Through Map." );

    var testComment = {
            id : 1337,
            com_content: "ContentContent1337"
        }
        , newTestCommentContent = "TestComment1337_Update"

    // Try to read a non-existent comment.
    handler.findOneByMap ( model, {com_content : testComment.com_content}, function ( results ) {
        assert.equal ( results.message.content, null, "[Comments] This tuple already exists within the database." );
        
        // Create a new comment in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created comment.
            handler.findOneByMap ( model, {com_content : testComment.com_content}, function ( results ) {
                assert.equal ( results.message.content.com_content, testComment.com_content, "Update in testing session." );

                // Update the previously read comment.
                handler.updateOneByMap ( false, model, {com_content : testComment.com_content}, function ( results ) {
                        // Read the previously updated comment.
                        handler.findOneByMap ( model, {com_content : newTestCommentContent}, function ( results ) {
                            assert.equal ( results.message.content.com_content, newTestCommentContent, "[Comments] Update in testing session." );

                            // Delete the previously read comment.
                            handler.delOneByMap ( model, {com_content : newTestCommentContent}, function ( results ) {
                                // Read the previously deleted comment.
                                handler.findOneByMap ( model, {com_content : newTestCommentContent}, function ( results ) {
                                        assert.equal ( results.message.content, null );
                                } );
                            } );    
                        } );
                }, JSON.stringify ( {com_content : newTestCommentContent} ) );
            } );
        }, JSON.stringify ( testComment ) );
    } );
}
