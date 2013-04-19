/*
 * Process the arguments commandline parsing.
 * 
 * @param conf {Object} Configuration file object (args part).
 * @return {Object} Program compliant confguration object.
 */
module.exports = function ( conf ) {
    // Initiate a default object depending on conf file.
    var args = {
        test : conf.test.default,
        logging : conf.logging.default,
        dbLocation : conf.dbLocation.default
    };

    // Parse commandline arguments.
    process.argv.forEach ( function ( val, index, array ) {
        switch ( val ) {
            case '-t':
            case '--test':
                args.test = true;
                break;
            case '-l':
            case '--logging':
                args.logging = console.log;
                break;
            case '-r':
            case '--remote':
                args.dbLocation = 'remote';
                break;
        }
    } );

    return args;
};
