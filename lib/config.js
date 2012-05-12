var fs = require ( 'fs' );

module.exports = function ( configFilePath ) {
	return JSON.parse ( fs.readFileSync ( configFilePath, 'utf-8' ) );
};