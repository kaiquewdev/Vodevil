// Voudevil array work lib.
var Voudevil = (function () {
    var core = function () {};

    // Internal engine functions
    var __range__ = function ( left, right, jump ) {
        // create a sequence of array
        var output = [],
            jump = jump || 1;
        
        for (var s = left; s <= right; s += jump ) {
            output.push( s );
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

    core.prototype = {
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
                    pointer[0].search(/[a-z]/) > -1 &&
                    pointer[1].search(/[a-z]/) > -1
                ) {
                    output = __letter__( pointer[0], pointer[1] );    
                }
            }

            return output;
        }    
    };

    return new core;
} ());

exports.core = Voudevil;
