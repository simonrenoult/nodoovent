/*
 * Require the node modules.
 * http is a native nodejs module.
 * orm is installed from Node Package Manager (npm),
 * already present in node_modules folder.
 */
var http = require ( 'http' )
  , orm = require ( 'orm' )
  , conf = require ( './lib/config.js' ) ( './conf.json' );

 http
    .createServer ( function ( req, res) {
       router ( req, res, db );
    } )
    .listen ( conf.api.port, conf.api.address );

/*
 * Connect orm to db
 */


var connectionAddress =  conf.db.type + '://'
    + conf.db.user + ':' + conf.db.password
    + '@' + conf.db.host + ':' + conf.db.port + '/' + conf.db.dbName;

orm.connect ( connectionAddress, function ( success, db ) {
    if ( !success ) {
        console.log ( 'Could not connect to database.' );
    } else {

        console.log ( 'Application connected to database.' );
        console.log ( connectionAddress );

        /*
         * Define models
         */

        var Author = db.define ( "author", {
            "aut_name"   : { "type": "string" }
            }, {
            "methods" : {
                "fullName" :function () {
                    return this.aut_name;
                }
            }
        });

        var Category = db.define("category", {
            "cat_name"   : { "type": "string" },
            "cat_description"   : { "type": "string" }
        });

        var Tag = db.define("tag", {
            "tag_name"   : { "type": "string" }
        });

        var Element = db.define("element", {
            "ele_name"   : { "type": "string" },
            "ele_content"   : { "type": "string" },
            "ele_data_creation"   : { "type": "date" }
        });

        Element.hasMany ( "authors", db._models.author, "author" );
        Element.hasMany ( "tags", db._models.tag, "tag" );
        Element.hasOne ( "category", db._models.category );

        Tag.sync ( );
        Category.sync ( );
        Author.sync ( );
        Element.sync ( );

        /*
         * Once models are defined, we can create a server and use models.
         */

        http
            .createServer ( function ( req, res) {
                router ( req, db, function ( result ) {
                    res.writeHead ( 200, { "Content-Type": "text/plain" } );
                    res.end ( result );
                } );
                console.log ( req );
            } )
            .listen ( conf.api.port, conf.api.address );
    }
} );

/*
 * Create a new server.
 * Each request is handled with the callback.
 */

function router ( req, db, handler ) {

    console.log ( req.method + ' ' + req.url );

    if ( req.method === 'GET' ) {
        var occ;
        if ( occ = req.url.match ( /^\/author\/([0-9]+)/ ) ) {
            db._models.author.get ( occ[1], function ( apiRes ) {
                handler ( apiRes );
            } );
        }
    } else if ( req.method === 'POST' ) {
        var data = '';
        req.on ( 'data', function ( chunk ) {
            data += chunk;
        } )
        .on ( 'end', function ( ) {
            if ( req.url.match ( /^\/author/ ) ) {
                handler ( { OK: true } );
            }
        } )
        .on ( 'error', function ( err ) {
            handler ( { OK: false } );
        } );
    } else if ( req.method === 'PUT' ) {

    } else if ( req.metod === 'DELETE' ) {

    }
}

console.log ( 'Server running at http://' + conf.api.address + ':' + conf.api.port + '.');
