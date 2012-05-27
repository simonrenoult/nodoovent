exports.get = function ( model, id, callback ) {
    model.get ( id, function ( res ) {
        callback ( {
            code: res ? 200 : 404,
            content : res
        } );
    } );
};

exports.find = function ( model, map, callback ) {
    model.find ( map, function ( res ) {
        callback ( {
            code: res ? 200 : 404,
            content : res
        } );
    } );
};

exports.findAll = function ( model, callback ) {
    model.find ( function ( res ) {
        callback ( {
            code: res ? 200 : 404,
            content : res
        } );
    } );
};

exports.post = function ( req, model, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk
    } ).on ( 'end', function ( ) {
        new model ( JSON.parse ( rawData ) ).save ( function ( err ) {
            callback ( {
                code: err ? 404 : 200,
                content : err ? err : { OK: true }
            } );
        } );
    } ).on ( 'error', function ( err ) {
        callback ( {
            code : 404,
            content : err
        } );
    } );
};

exports.put = function ( req, model, url, id, callback ) {
    var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
        if ( /^(\d+)$/.test ( url ) ) {
            model.get ( id, function ( res ) {
                if ( !res ) {
                    callback ( {
                        code: 404,
                        content : { OK: false }
                    } );
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
                    } ) ( res.content );

                    res.content.save ( function ( err ) {
                        callback ( {
                            code: err ? 404 : 200,
                            content : err ? err : { OK: true }
                        } );
                    } );
                }
            } );
        } else if ( /^(\w+)$/.test ( url ) ) {
            model.find ( id, function ( res ) {
                if ( !res ) {
                    callback ( {
                        code: 404,
                        content : { OK: false }
                    } );
                } else {
                    var data = JSON.parse ( rawData );
                    for ( var i = 0 ; i < res.length ; i++ ) {
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
                        } ) ( res[i] );

                        res[i].save ( function ( err ) {
                            callback ( {
                                code: err ? 404 : 200,
                                content : err ? err : { OK: true }
                            } );
                        } );
                    }
                }
            } );
        }
    } ).on ( 'error', function ( err ) {
        callback ( {
            code : 404,
            content : err
        } );
    } );
};

exports.del = function ( model, url, id, callback ) {
    if ( /^(\d+)$/.test ( url ) ) {
        model.get ( id, function ( res ) {
            if ( !res ) {
                callback ( {
                    code : 404,
                    content : { OK: false }
                } );
            } else {
                res.remove ( function ( ) {
                    callback ( {
                        code : 200,
                        content : { OK: true }
                    } );
                } );
            }
        } );
    } else if ( /^(\w+)$/.test ( url ) ) {
        model.find ( id, function ( res ) {
            if ( !res ) {
                callback ( {
                    code : 404,
                    content : { OK: false }
                } );
            } else {
                for ( var i = 0 ; i < res.length ; i++) {
                    res[i].remove ( function ( ) {
                        callback ( {
                            code : 200,
                            content : { OK: true }
                        } );
                    } );
                }
            }
        } );
    }
};

exports.delAll = function ( model, callback ) {
    model.clear ( function ( ) {
        callback ( {
            code : 200,
            content : { OK: true }
        } );
    } );
};