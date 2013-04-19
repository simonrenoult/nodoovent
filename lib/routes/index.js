var elements = require ( __dirname + '/elements.js' )
  , users = require ( __dirname + '/users.js' )
  , tags = require ( __dirname + '/tags.js' );

/*
 * Client requests routing process.
 *
 * @param conf {Object}
 * @param server {Object}
 * @param models {Object}
 */
exports.process = function ( conf, server, models ) {

    elements.route ( models, server );
    users.route ( models, server );
    tags.route ( models, server );
};
