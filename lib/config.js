var fs = require ( 'fs' );

/*
 * Process the configuration file parsing to a JSON Object.
 * 
 * @param configFilePath {String} Path to the configuation file.
 * @return {Object} The configuration file as an JSON object.
 */
module.exports = function ( configFilePath ) {
	return JSON.parse ( fs.readFileSync ( configFilePath, 'utf-8' ) );
};
