var querystring = require ( 'querystring' );

module.exports = {
    get: function ( model, id, callback ) {
        model.get ( id, function ( res ) {
            callback ( { code : 200, content : res } ) ;
        } );
    },
    find : function ( model, key, value, callback ) {
        var data = JSON.parse ( '{"' + key + '":"' + value + '"}' );
        model.find ( data, function ( res ) {
            callback ( { code: 200, content: res } );
        } );
    },
    getAll: function ( model, callback ) {
        model.find ( function ( res ) {
            callback ( { code : 200, content : res } );
        } );
    },
    post: function ( req, model, callback ) {
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
    put: function ( req, model, id, callback ) {
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
    del: function ( model, id, callback ) {
        model.get ( id, function ( res ) {
            res.remove ( function ( ) {
                callback ( { code : 200, content : { OK: true } } );
            } )
        } );
    }
};