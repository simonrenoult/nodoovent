exports.findOneByID = function findOneFromID ( model, id, callback ) {
    model.get ( id, function ( res ) {
        if ( !res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } else {
            callback ( { OK: true, content: res } );
        }
    } );
};

exports.findOneByMap = function findOneFromMap ( model, map, callback ) {
    model.find ( map, function ( res ) {
        if ( !res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } else {
            callback ( { OK: true, content: res } );
        }
    } );
};

exports.findAll = function ( model, callback ) {
    model.find ( function ( res ) {
        if ( !res ) {
            callback ( { OK: false, content: 'No result found.' } );
        } else {
            callback ( { OK: true, content: res } );
        }
    } );
};

exports.saveOne = function ( req, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        new model ( JSON.parse ( rawData ) ).save ( function ( err ) {
            if ( !err ) {
                callback ( { OK: true, content: 'Record has been saved.' } );
            } else {
                callback ( { OK: false, content: err } );
            }
        } );
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err } );
    } );
};

exports.updateOneByID = function ( req, model, id, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        model.get ( id, function ( res ) {
            if ( !res ) {
                callback ( { OK: false, content: 'No record matched.' } );
            } else {
                var newValuesMap  = JSON.parse ( rawData );
                ( function rec ( recordFound ) {
                    for ( var k in newValuesMap ) {
                        for ( var _k in recordFound ) {
                            if ( k === _k ) {
                                recordFound[k] = newValuesMap[k];
                            }
                            if ( typeof _k === 'object' ) {
                                rec ( _k );
                            }
                        }
                    }
                } ) ( res );

                res.save ( function ( err ) {
                    if ( !err ) {
                        callback ( { OK: true, content: 'Record has been updated.' } );
                    } else {
                        callback ( { OK: false, content: err } );
                    }
                } );
            }
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
        model.get ( map, function ( res ) {
            if ( !res ) {
                callback ( { OK: false, content: 'No record matched.' } );
            } else {
                var data = JSON.parse ( rawData );
                ( function rec ( obj ) {
                    for ( var k in data ) {
                        for ( var _k in obj ) {
                            if ( k === _k ) {
                                obj[k] = data[k];
                            }
                            if ( typeof _k === 'object' ) {
                                rec ( _k );
                            }
                        }
                    }
                } ) ( res.message );

                res.message.save ( function ( err ) {
                    if ( !err ) {
                        callback ( { OK: true, content: 'Record has been updated.' }  );
                    } else {
                        callback ( { OK: false, content: err }  );
                    }
                } );
            }
        } );
    } ).on ( 'error', function ( err ) {
        callback ( { OK: false, content: err }  );
    } );
};

exports.delOneByID = function ( model, id , callback ) {
    model.get ( id, function ( res ) {
        if ( !res ) {
            callback ( { OK: false, content: 'No record matched.' } );
        } else {
            res.remove ( function ( ) {
                callback ( { OK: true, content: 'Record has been deleted.' } );
            } );
        }
    } );
};

exports.delOneByMap = function ( model, id, callback ) {
    model.find ( id, function ( res ) {
        if ( !res ) {
            callback ( { OK: false, content: 'No record matched.' } );
        } else {
            for ( var i = 0 ; i < res.length ; i++) {
                res[i].remove ( function ( ) {
                    callback ( { OK: true, content: 'Record(s) has(ve) been deleted.' } );
                } );
            }
        }
    } );
};

exports.delAll = function ( model, callback ) {
    model.clear ( function ( ) {
        callback ( { OK: true, content: 'Records have been deleted.' } );
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