// Vodevil array work lib.
var Vodevil = (function () {
    var core = function () {};

    // Internal engine functions
    var __range__ = function ( left, right, jump ) {
        // create a sequence of array
        var output = [],
            jump = jump || 1,
            s = left;
        
        while ( s <= right ) {
            output.push( s );    

            s += jump;
        }

        return output;
    };

    var __letter__ = function ( left, right ) {
        var output = [],
            alpha = {};
            // Alphabetic
            alpha['upper'] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            alpha['lower'] = alpha['upper'].toLowerCase();
            alpha['betic'] = alpha.lower + alpha.upper;

        for ( var s = alpha.betic.indexOf( left ), e = alpha.betic.indexOf( right ); s <= e; s++ ) {
            output.push( alpha.betic[ s ] );
        }

        return output;
    };

    var __bang__ = function ( target, times ) {
        var output = [],
            c = 0;

        while ( c < times ) {
            output.push( target );
            c += 1;
        }

        return output;
    };

    var __clean__ = function ( target, piece ) {
        var output = [],
            copyTarget = target;

        while ( copyTarget.indexOf( piece ) > -1 ) {
            delete copyTarget[ copyTarget.indexOf( piece ) ];
        }

        for ( var t in copyTarget ) {
            if ( copyTarget[t] !== undefined ) {
                output.push( copyTarget[t] );    
            }    
        }

        return output;
    };

    core.prototype = {
        isArray: function ( target ) {
            var output = false;

            if ( 
                typeof target !== undefined && 
                target !== undefined && 
                target.constructor.toString().indexOf('Array') > -1 
            ) { 
                output = true; 
            }

            return output;
        },

        range: function ( left, right ) {
            var output = [];

            if ( typeof left === 'number' && typeof right === 'number' ) {
                output = __range__( left, right );
            } else if ( typeof left === 'string' && !right ) {
                var pointer = left.split('..');

                if ( 
                    pointer[0].search(/[0-9]/) > -1 && 
                    pointer[1].search(/[0-9]/) > -1 
                ) {
                    output = __range__( 
                        parseInt( pointer[0], 10 ), 
                        parseInt( pointer[1], 10 ) 
                    );
                } else if ( 
                    pointer[0].search(/[a-z|A-Z]/) > -1 &&
                    pointer[1].search(/[a-z|A-Z]/) > -1
                ) {
                    output = __letter__( pointer[0], pointer[1] );    
                }
            }

            return output;
        },

        bang: function ( target, times ) {
            var output = [];

            if ( typeof times === 'number' ) {
                output = __bang__( target, times ); 
            }

            return output;
        },

        clean: function ( target, piece ) {
            var output = target || [],
                blackList = ['', null];

            if ( target ) {
                for ( var item in blackList ) {
                    output = __clean__( output, blackList[item] );
                }

                if ( piece ) {
                    output = __clean__( output, piece );
                }
            }

            return output;
        },
    };

    return new core;
} ());

exports.core = Vodevil;
