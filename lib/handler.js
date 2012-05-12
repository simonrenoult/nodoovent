exports.post = function ( req, res) {

}

exports.get = function ( req, res) {
    switch ( req.url ) {
        case '/' :
            res.writeHead( 200, {'Content-Type': 'text/plain'} );
            res.end( 'GET ' + req.url );
            break;
        default :
            res.writeHead(404, {'Content-Type': 'text/plain'});
            break;
    }
}

exports.put = function ( req, res) {

}

exports.delete = function ( req, res) {

}
