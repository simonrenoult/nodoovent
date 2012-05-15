exports.read = function ( content ) {
    if ( content.match ( /[0-9]/ ) ) {
        Tag.get ( content, function ( res ) {
            return res;
        });
    } else {
        Tag.find ( JSON.parse ( content ), function (res) {
            return res;
        });
    }
};

exports.readAll = function ( ) {

};

exports.add = function ( content ) {
    new Tag ( JSON.parse ( content ) ).save ( function ( err ) {
        if ( err ) {
            return;
        } else {
            return;
        }
    } ) ;
};

exports.update = function ( content ) {

};

exports.remove = function ( content ) {
    read ( content ).remove ( function ( err ) {
        if ( err ) {
            return;
        } else {
            return;
        }
    } );
};