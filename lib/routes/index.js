module.exports = function ( req, handler, models, callback ) {
    console.log ( req.method + ' ' + req.url );

    // --------- ELEMENTS -------- //

    /*
     * > 1st level routes (or pseudo 2nd) :
     *
     *      /elements
     *      /elements/1
     *
     */

    if ( /^\/elements$/.test ( req.url ) ) {
        if ( req.method === 'GET' ) {
            handler.findAll ( models.authors, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
        } else if ( req.method === 'DELETE' ) {
            handler.delAll ( models.authors, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
        } else {
            handler.resStructure ( 405, false, 'HTTP method is not allowed for this URL.' );
        }
    } else if ( /^\/elements\/(\d+)$/.test ( req.url ) ) {
        if ( req.method === 'GET' ) {
            handler.findOneByID ( models.authors, RegExp.$1, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
        } else if ( req.method === 'PUT' ) {
            handler.updateOneByID ( req, models.authors, RegExp.$1, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
        } else if ( req.method === 'DELETE' ) {
            handler.delOneByID ( models.authors, RegExp.$1, function ( res ) {
                callback ( handler.resStructure ( 200, res.OK, res.content ) );
            } );
        } else {
            handler.resStructure ( 405, false, 'HTTP method is not allowed for this URL.' );
        }
    }

    /*
     * > 2nd (or pseuo 3rd) level routes :
     *
     *      /authors/elements
     *      /authors/1/elements
     *      /authors/tom/elements
     *
     *      /categories/elements
     *      /categories/7/elements
     *      /categories/family/elements
     *
     *      /tags/elements
     *      /tags/4/elements
     *      /tags/js/elements
     *
     */

    else if ( /^\/authors\/elements$/.test ( req.url ) ) {
        if ( req.method === 'GET' ) {
            // Get every authors
            handler.findAll ( models.authors, function ( res ) {
                if ( !res.OK ) {
                    callback ( handler.resStructure ( 200, false, 'No author found.' ) );
                } else {
                    var authors = res.content
                      , elements = [];
                    // Get each element of each author
                    for ( var aut in authors ) {
                        handler.findOneByMap ( models.elements, { authors_id: authors[aut].id }, function ( ele ) {
                            if ( !ele ) {

                            } else {
                                elements.push ( ele );
                            }
                        } );
                    }

                    console.log ( 'ici' );
                }
            } )
        } else if ( req.method === 'DELETE' ) {
            hander.findAll ( models.authors, function ( res ) {
                if ( !res.OK ) {
                    callback ( handler.resStructure ( 200, false, 'No author found.' ) );
                } else {

                }
            } );
        } else {
            handler.resStructure ( 405, false, 'HTTP method is not allowed for this URL.' );
        }
    } else if ( /^\/authors\/(\d+)\/elements$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)\/elements$/.test ( req.url ) ) {

    }

    else if ( /^\/categories\/elements$/.test ( req.url ) ) {

    } else if ( /^\/categories\/(\d+)\/elements$/.test ( req.url ) ) {

    } else if ( /^\/categories\/(\w+)\/elements$/.test ( req.url ) ) {

    }

    else if ( /^\/tags\/elements$/.test ( req.url ) ) {

    } else if ( /^\/tags\/(\d+)\/elements$/.test ( req.url ) ) {

    } else if ( /^\/tags\/(\w+)\/elements$/.test ( req.url ) ) {

    }

    // --------- AUTHORS -------- //

    /*
     * > 1st level routes :
     *
     *      /authors
     *      /authors/1
     *      /authors/tom
     */

    else if ( /^\/authors$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\d+)$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)$/.test ( req.url ) ) {

    }

    // --------- TAGS -------- //

    /*
     * > 1st level routes :
     *
     *      /tags
     *      /tags/4
     *      /tags/js
     *
     */

    else if ( /^\/tags$/.test ( req.url ) ) {

    } else if ( /^\/tags\/(\d+)$/.test ( req.url ) ) {

    } else if ( /^\/tags\/(\w+)$/.test ( req.url ) ) {

    }

    /*
     * > 2nd (or pseuo 3rd) level routes :
     *
     *      /elements/tags
     *      /elements/tags/1
     *
     */

    else if ( /^\/elements\/tags$/.test ( req.url ) ) {

    } else if ( /^\/elements\/(\d+)\/tags$/.test ( req.url ) ) {

    }

    /*
     * > 3rd (or pseudo 4th) level routes :
     *
     *      /authors/elements/tags
     *      /authors/1/elements/tags
     *      /authors/tom/elements/tags
     *      /authors/1/elements/1/tags
     *      /authors/tom/elements/1/tags
     *
     */

    else if ( /^\/authors\/elements\/tags$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\d+)\/elements\/tags$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)\/elements\/tags$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\d+)\/elements\/(\d+)\/tags$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)\/elements\/(\d+)\/tags$/.test ( req.url ) ) {

    }

    // --------- CATEGORIES -------- //

    /*
     * > 1st level routes :
     *
     *      /categories
     *      /categories/7
     *      /categories/family
     *
     */

    else if ( /^\/categories$/.test ( req.url ) ) {

    } else if ( /^\/categories\/(\d+)$/.test ( req.url ) ) {

    } else if ( /^\/categories\/(\w+)$/.test ( req.url ) ) {

    }

    /*
     * > 2nd (or pseuo 3rd) level routes :
     *
     *      /elements/categories
     *      /elements/1/categories
     *
     */

    else if ( /^\/elements\/categories$/.test ( req.url ) ) {

    } else if ( /^\/elements\/(\d+)\/categories$/.test ( req.url ) ) {

    }

    /*
     * > 3rd (or pseudo 4th) level routes :
     *
     *      /authors/elements/categories
     *      /authors/1/elements/categories
     *      /authors/tom/elements/categories
     *      /authors/1/elements/1/categories
     *      /authors/tom/elements/1/categories
     *
     */

    else if ( /^\/authors\/elements\/categories$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\d+)\/elements\/categories$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)\/elements\/categories$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\d+)\/elements\/(\d+)\/categories$/.test ( req.url ) ) {

    } else if ( /^\/authors\/(\w+)\/elements\/(\d+)\/categories$/.test ( req.url ) ) {

    }
};