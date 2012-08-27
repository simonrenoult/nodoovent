var fs = require ( 'fs' );

/*
 * Process the parsing of the configuration file to a JSON Object.
 * 
 * @param configFilePath {String} Path to the configuation file.
 */
module.exports = function ( configFilePath ) {
	return JSON.parse ( fs.readFileSync ( configFilePath, 'utf-8' ) );
};
