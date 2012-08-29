exports.respond = function ( res, resStructure ) {
	res.writeHead ( resStructure.code, { "Content-Type": "application/json" } );
    res.end ( JSON.stringify ( resStructure.message ) );
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

function onEnd ( req, func, callback ) {
	var rawData = '';
    req.on ( 'data', function ( chunk ) {
        rawData += chunk;
    } ).on ( 'end', function ( ) {
    	func ( rawData );
    } ).on ( 'error', function ( err ) {
        callback ( resStructure ( 200, false, err ) );
    } );    
}

/*		FIND		*/

exports.findOneByID = function ( model, id, callback ) {
    model.find ( id )
        .success ( function ( res ) {
            callback ( resStructure ( 200, true, res ) );
        } )
        .error ( function ( res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } );
};

exports.findOneByMap = function ( model, map, callback ) {
    model.find ( { where: map } )
        .success ( function ( res ) {
            callback ( resStructure ( 200, true, res ) );
        } )
        .error ( function ( res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } );
};

exports.findManyByMap = function ( model, map, callback ) {
    mondel.findAll ( { where: map } )
        .success ( function( res ) {
            callback ( resStructure ( 200, true, res ) );
        } )
        .error ( function ( res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } );
};

exports.findAll = function ( model, callback ) {
    model.findAll ( )
        .success ( function ( res ) {
            callback ( resStructure ( 200, true, res ) );
        } )
        .error ( function ( res ) {
            callback ( resStructure ( 200, false, 'No result found.' ) );
        } ) ;
};

/*		SAVE		*/

exports.saveOne = function ( req, model, callback, testSessionData ) {
	var func = function ( rawData ) { 
    	var raw = model.build ( JSON.parse ( rawData ) );
        raw.save ( )
            .success ( function ( res ) {
               callback ( resStructure ( 200, true, 'Record has been saved.' ) );
            } )
            .error ( function ( err ) { 
                callback ( resStructure ( 200, false, err ) );
            } );
    };

	if ( !testSessionData ) {
    	onEnd ( req, func, callback );	
	} else {
		func ( testSessionData );
	}
};

/*		UPDATE		*/

exports.updateOneByID = function ( req, model, id, callback, testSessionData ) {
	var func = function ( rawData ) { 
        model.find ( id )
            .success ( function ( raw ) {
                raw.updateAttributes ( JSON.parse ( rawData ) )
                    .success ( function ( res ) {
               			callback ( resStructure ( 200, true, 'Record has been updated.' ) );
                    } )
                    .error ( function ( err ) {
                    	callback ( resStructure ( 200, false, err ) );
                    } );
            } )
            .error ( function ( res ) {
		        callback ( resStructure ( 200, false, 'No record matched.' ) );
            } );
    };
    
    if ( !testSessionData ) {
    	onEnd ( req, func, callback );	
	} else {
		func ( testSessionData );
	}
};

exports.updateOneByMap = function ( req, map, model, callback, testSessionData ) {
    var func = function ( rawData ) { 
        model.find ( { where: map } )
            .success ( function ( raw ) {
                raw.updateAttributes ( rawData )
                    .success ( function ( res ) {
               			callback ( resStructure ( 200, true, 'Record has been saved.' ) );
                    } )
                    .error ( function ( err ) {
	                    callback ( resStructure ( 200, false, err ) );
                    } );
            } )
            .error ( function ( res ) {
		        callback ( resStructure ( 200, false, 'No record matched.' ) );
            } );
    };
    
    if ( !testSessionData ) {
    	onEnd ( req, func, callback );	
	} else {
		func ( testSessionData );
	}
};

exports.updateManyByMap = function ( req, map, model, callback, testSessionData ) {
   var func = function ( rawData ) { 
        model.findAll ( { where: map } )
            .success ( function ( raws ) {
                for ( var i = 0 ; i < raws.length ; i++ ) {
                    raws[i].updateAttributes ( rawData )
                         .success ( function ( res ) {
               			callback ( resStructure ( 200, true, 'Record has been updated.' ) );
                    } )
                    .error ( function ( err ) {
		                callback ( resStructure ( 200, false, err ) );
                    } );
                }
            } );
    };
    
    if ( !testSessionData ) {
    	onEnd ( req, func, callback );	
	} else {
		func ( testSessionData );
	}
};

/*		DELETE		*/

exports.delOneByID = function ( model, id , callback ) {
    model.find ( id )
        .success ( function ( raw ) {
            raw.destroy ( )
                .success ( function ( res ) {
               			callback ( resStructure ( 200, true, 'Record has been deleted.' ) );
                } )
                .error ( function ( err ) {
                    callback ( resStructure ( 200, false, err ) );
                } );
        } )
        .error ( function ( res ) {
	        callback ( resStructure ( 200, false, 'No record matched.' ) );
        } );
};

exports.delOneByMap = function ( model, map, callback ) {
    model.find ( { where: map } )
        .success ( function ( raw ) {
            raw.destroy ( )
                .success ( function ( res ) {
               		callback ( resStructure ( 200, true, 'Record has been deleted.' ) );
                } )
                .error ( function ( err ) {
                    callback ( resStructure ( 200, false, err ) );
                } );
        } )
        .error ( function ( res ) {
	        callback ( resStructure ( 200, false, 'No record matched.' ) );
        } );
};

exports.delManyByMap = function ( model, map, callback ) {
    model.findAll ( { where : map } )
        .success ( function ( raws ) {
            for ( var i = 0; i < raws.length; i++ ){
                raws[i].destroy ( )
                    .success ( function ( res ) {
               			callback ( resStructure ( 200, true, 'Record has been deleted.' ) );
                    } )
                    .error ( function ( err ) {
                    	callback ( resStructure ( 200, false, err ) );
                    } );
            }
        } )
        .error ( function ( res ) {
	        callback ( resStructure ( 200, false, 'No record matched.' ) );
        } );
};

exports.delAll = function ( model, callback ) {
	// Get every results.
	model.findAll ( ).success ( function ( results ) {
		// Browse these results.
		for ( var res in results ) {
			// Delete these results (one by one).
			results[res].destroy ( )
		}
		
		callback ( resStructure ( 200, true, 'Records have been deleted.' ) );
	} );
};
