var assert = require ( 'assert' );

module.exports = function ( model, handler ) {
    console.log ( "-- > Privacies." );
    console.log ( "> Through ID." );

    var testPrivacies = {
        id : 666,
        pri_name : "Testing privacy"
    };

    // Try to read a non-existent element.
    handler.findOneByID ( model, testPrivacies.id, function ( results ) {
        assert.equal ( results.message.content, null, "[Privacies] This tuple already exists within the database." );
        
        // Create a new element in the database.
        handler.saveOne ( false, model, function ( results ) {
            // Read the previously created element.
            handler.findOneByID ( model, testPrivacies.id, function ( results ) {
                assert.equal ( results.message.content.id, testPrivacies.id, "[Privacies] This tuple can't be find." );

                // Update the previously read element.
                handler.updateOneByID ( false, model, testPrivacies.id, function ( results ) {
                    // Read the previously updated element.
                    handler.findOneByID ( model, testPrivacies.id, function ( results ) {
                        assert.equal ( results.message.content.pri_name, "Update in testing session." );

                        // Delete the previously read element.
                        handler.delOneByID ( model, testPrivacies.id, function ( results ) {
                            // Read the previously deleted element.
                            handler.findOneByID ( model, testPrivacies.id, function ( results ) {
                                    assert.equal ( results.message.content, null );
                            } );
                        } );
                    } );
                }, JSON.stringify ( { pri_name : "Update in testing session." } ) );
            } );
        }, JSON.stringify ( testPrivacies ) );
    } );
}
