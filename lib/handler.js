exports.findOneByID = function ( model, id, callback ) {
    model.find( id )
        .success ( function ( res ) {
            callback ( { OK: true, content: res.JackSONFive ( ) } );
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } );
};

exports.findOneByMap = function ( model, map, callback ) {
    model.find ( { where: map } )
        .success ( function ( res ) {
            callback ( { OK: true, content: res.JackSONFive ( ) } );
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } );
};

exports.findManyByMap = function ( model, map, callback ) {
    mondel.findAll ( { where: map } )
        .success ( function( res ) {
            callback ( { OK: true, content: res.JackSONFive ( ) } );
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } );
};

exports.findAll = function ( model, callback ) {
    model.findAll( )
        .success ( function ( res ) {
            callback ( { OK: true, content: res.JackSONFive ( ) } );
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } ) ;
};

exports.saveOne = function ( req, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        var raw = model.build( rawData );
        raw.save ( )
            .success ( function ( res ) {
               callback ( { OK: true, content: 'Record has been saved.' } );
            } )
            .error ( function ( res ) { 
                callback ( { OK: false, content: err } );
            } );
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err } );
    } );
};

exports.updateOneByID = function ( req, model, id, callback ) {
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        model.find( id )
            .success ( function ( raw ) {
                raw.updateAttributes( rawData )
                    .success( function ( res ) {
                        callback ( { OK: true, content: 'Record has been updated.' } );
                    } )
                    .error ( function ( err ) {
                        callback ( { OK: false, content: err } );
                    } );
            } )
            .error ( function ( res ) {
                callback ( { OK: false, content: 'No record matched.'  } );
            } );
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err } );
    } );
};

exports.updateOneByMap = function ( req, map, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        model.find ( { where: map } )
            .success ( function ( raw ) {
                raw.updateAttributes( rawData )
                    .success ( function ( res ) {
                        callback ( { OK: true, content: 'Record has been updated.' } );
                    } )
                    .error ( function ( err ) {
                        callback ( { OK: false, content: err } );
                    } );
            } )
            .error ( function ( res ) {
                callback ( { OK: false, content: 'No record matched.' } );
            } );
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err }  );
    } );
};

exports.updateManyByMap = function ( req, map, model, callback ){
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawDate += chunk;
    } ).on ( 'end', function ( ) {
        model.findAll ( { where: map } )
            .success ( function ( raws ) {
                for ( var i = 0; i < raws.length; i++ ){
                    raws[i].updateAttributes ( rawData )
                         .success ( function ( res ) {
                        callback ( { OK: true, content: 'Record has been updated.' } );
                    } )
                    .error ( function ( err ) {
                        callback ( { OK: false, content: err } );
                    } );
                }
            } )
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err }  );
    } );
};

exports.delOneByID = function ( model, id , callback ) {
    model.find ( id )
        .success ( function ( raw ) {
            raw.destroy ( )
                .success ( function ( res ) {
                    callback ( { OK: true, content: 'Record has been deleted.' } );
                } )
                .error ( function ( err ) {
                    callback ( { OK: false, content: err } );
                })
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No record matched.' } );
        } );
};

exports.delOneByMap = function ( model, map, callback ) {
    model.find ( { where: map } )
        .success ( function ( raw ) {
            raw.destroy ( )
                .success ( function ( res ) {
                    callback ( { OK: true, content: 'Record has been deleted.' } );
                } )
                .error ( function ( err ) {
                    callback ( { OK: true, content: err } );
                } );
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No record matched.' } );
        } );
};

exports.delManyByMap = function ( model, map, callback ) {
    model.findAll ( { where : map })
        .success ( function ( raws ) {
            for ( var i = 0; i < raws.length; i++ ){
                raws[i].destroy ( )
                    .success ( function ( res ) {
                        callback ( { OK: true, content: 'Record has been deleted.' } );
                    } )
                    .error ( function ( err ) {
                        callback ( { OK: true, content: err } );
                    } );
            }
        } )
        .error ( function ( res ) {
            callback ( { OK: false, content: 'No record matched.' } );
        } );
};

exports.resStructure = resStructure = function ( code, isOK, messageContent ) {
    return {
        code: code,
        message: {
            OK: isOK,
            content: messageContent
        }
    };
};