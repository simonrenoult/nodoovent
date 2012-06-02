exports.findOneFromID = function findOneFromID ( model, id, callback ) {
    model.get ( id, function ( res ) {
        if ( !res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } else {
            callback (  resStructure ( 200, true, res ) );
        }
    } );
};

exports.findOneFromMap = function findOneFromMap ( model, map, callback ) {
    model.find ( map, function ( res ) {
        if ( !res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } else {
            callback (  resStructure ( 200, true, res ) );
        }
    } );
};

exports.findAll = function ( model, callback ) {
    console.log ( model );
    model.find ( function ( res ) {
        if ( !res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } else {
            callback (  resStructure ( 200, true, res ) );
        }
    } );
};

exports.saveOne = function ( req, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk
    } ).on ( 'end', function ( ) {
        new model ( JSON.parse ( rawData ) ).save ( function ( err ) {
            if ( !err ) {
                callback (  resStructure ( 200, true, 'Record has been saved.' ) );
            } else {
                callback ( resStructure ( 200, false, err ) );
            }
        } );
    } ).on ( 'error', function ( err ) {
        callback ( resStructure ( 200, false, err ) );
    } );
};

exports.updateOneFromID = function ( req, model, id, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        model.get ( id, function ( res ) {
            if ( !res ) {
                callback ( resStructure ( 200, false, 'No result found.' ) );
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
                        callback ( resStructure ( 200, true, 'Record has been updated.') );
                    } else {
                        callback ( resStructure ( 200, false, err ) );
                    }
                } );
            }
        } );
    } ).on ( 'error', function ( err ) {
        callback ( resStructure ( 200, false, err ) );
    } );
};

exports.updateOneFromMap = function ( req, map, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        model.get ( map, function ( res ) {
            if ( !res ) {
                callback ( resStructure ( 200, false, 'No record match this id.' ) );
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
                        callback ( resStructure ( 200, true, 'Record has been updated.') );
                    } else {
                        callback ( resStructure ( 200, false, err ) );
                    }
                } );
            }
        } );
    } ).on ( 'error', function ( err ) {
        callback ( resStructure ( 200, false, err ) );
    } );
};
exports.delOneByID = function ( model, id , callback ) {
    model.get ( id, function ( res ) {
        if ( !res ) {
            callback ( resStructure ( 200, false, 'No record match this id.' ) );
        } else {
            res.remove ( function ( ) {
                callback ( resStructure ( 200, true, 'Record has been deleted.' ) );
            } );
        }
    } );
};

exports.delOneByMap = function ( model, id, callback ) {
    model.find ( id, function ( res ) {
        if ( !res ) {
            callback ( resStructure ( 200, false, 'No record match this id.' ) );
        } else {
            for ( var i = 0 ; i < res.length ; i++) {
                res[i].remove ( function ( ) {
                    callback ( resStructure ( 200, true, 'Record(s) has(ve) been deleted.' ) );
                } );
            }
        }
    } );
};

exports.delAll = function ( model, callback ) {
    model.clear ( function ( ) {
        callback ( resStructure ( 200, true, 'Records have been deleted.' ) );
    } );
};

exports.resStructure = function resStructure ( code, isOK, messageContent ) {
    return {
        code: code,
        message: {
            OK: isOK,
            content: messageContent
        }
    };
}