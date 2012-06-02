module.exports = function ( req, handler, models, id, callback ) {
    console.log ( id );
    if ( !id ) {
        if ( req.method === 'GET' ) {
            handler.findAll ( models.author, callback );
        } else if ( req.method === 'DELETE' ) {
            handler.delAll ( models.author, callback );
        }
    } else if ( /\d+/.test ( id ) ) {
        if ( req.method === 'GET' ) {
            handler.getOne ( models.author, id, callback );
        } else if ( req.method === 'POST' ) {

        } else if ( req.method === 'PUT' ) {

        } else if ( req.method === 'DELETE' ) {

        }
    } else if ( /\w+/.test ( id ) ) {
        if ( req.method === 'GET' ) {
            handler.findOne ( models.author, {aut_name: id}, callback );
        } else if ( req.method === 'POST' ) {

        } else if ( req.method === 'PUT' ) {

        } else if ( req.method === 'DELETE' ) {

        }
    }
};

