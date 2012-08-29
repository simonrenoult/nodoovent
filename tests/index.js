exports.isRequired = function ( ) {
	// To start an api testing session, start the app with -t or --test argument.
	for ( var i = 0 ; i < process.argv.length ; i++ ) {
		if ( process.argv[i] === '--test' || process.argv[i] === '-t' ) {
			return true;
		}
	}
	
	return false;
};
