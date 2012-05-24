module.exports = {
    get: function ( model, id, callback ) {
        model.get ( id, function ( res ) {
            callback ( { code : 200, content : res } ) ;
        } );
    },
    post: function ( req, model ) {
        var data = '';
        req.on ( 'data', function ( chunk ) {
            data += chunk
        } )
        .on ( 'end', function ( ) {
            new model ( JSON.parse ( data ) ).save ( function ( err ) {
                if ( err ) {
                    callback ( { code : 404, content : err } );
                } else {
                    callback ( { code : 200, content : { OK : true } } );
                }
            } );
        } )
        .on ( 'error', function ( err ) {
            callback ( { code : 404, content : err } );
        } );
    },
    put: function ( req, model, id ) {
        var rawData = '';
        req.on ( 'data', function ( chunk ) {
            rawData += chunk
        } )
        .on ( 'end', function ( ) {
            model.get ( id, function ( res ) {
                var data = JSON.parse ( rawData );
                for ( var key in data ) {
                    res[key] = data[key];
                }
                res.save ( function ( err ) {
                    if ( err ) {
                        callback ( { code : 404, content : err } );
                    } else {
                        callback ( { code : 200, content : { OK : true } } );
                    }
                } );
            } )
        } )
        .on ( 'error', function ( err ) {
            callback ( { code : 404, content : err } );
        } );
    },
    del: function ( model, id ) {
        model.get ( id, function ( res ) {
            res.remove ( function ( ) {
                callback ( { code : 200, content : { OK: true } } );
            } )
        } );
    }
};