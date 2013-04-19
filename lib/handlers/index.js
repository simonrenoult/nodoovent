function Handler ( model ) {
    this.model = model;
}

Handler.prototype.getAll = function ( next ) {
    this.model.all ( ).success ( next );
};

Handler.prototype.getSome = function ( content, next ) {
    this.model.all ( { where : content } ).success ( next );
};

Handler.prototype.getOne = function ( content, next ) {
    this.model.find ( { where : content } ).success ( next );
};

Handler.prototype.saveOne = function ( content, next ) {
    this.model.create ( content ).success ( next );
};

Handler.prototype.updateOne = function ( content, next ) {
    
};

Handler.prototype.delAll = function ( next ) {
    this.model.all ( ).success ( function ( result ) {
        for ( var r in result ) {
            result[r].destroy ( );
        }
        
        return next ( );
    } );
};

Handler.prototype.delSome = function ( content, next ) {
    this.model.all ( { where : content } )
    .success ( function ( result ) {
        for ( var r in result ) {
            result[r].destroy ( );
        }
        
        return next ( );
    } );
};

// ---- READING ---- // 

Handler.prototype.readingSuccess = function ( content, res, next ) {
    var isEmpty = ( Array.isArray ( content ) ) ? ! content.length :  ! content;

    respond ( res, isEmpty ? 204 : 200, content );
    return next ( );
};

Handler.prototype.readingError = function ( res, next ) {
    respond ( res, 404, null );
    return next ( );
};

// ---- CREATION ---- // 

Handler.prototype.creationSuccess = function ( res, next ) {
    respond ( res, 201, null );
    return next ( );
}

Handler.prototype.creationError = function ( res, next ) {
    respond ( res, 400, null );
    return next ( );
};

// ---- UPDATE---- // 

Handler.prototype.updateSuccess = function ( res, next ) {
    respond ( res, 204, null );
    return next ( );
};

Handler.prototype.updateError = function ( res, next ) {
    respond ( res, 404, null );
    return next ( );
};

// ---- DELETION ---- // 

Handler.prototype.deletionSuccess = function ( res, next ) {
    respond ( res, 200, null );
    return next ( );
}

Handler.prototype.deletionError = function ( res, next ) {
    respond ( res, 400, null );
    return next ( );
};

/*
 * Function used to answer the client request.
 *
 * @param res {Object} HTTPServerResponse used to contact the client.
 * @param resStructure {Object} Contains client request server answer.
 */
Handler.prototype.respond = function ( res, code, message ) {
    res.writeHead ( code, { "Content-Type": "application/json" } );
    res.end ( JSON.stringify ( message ) );
};

module.exports = Handler;