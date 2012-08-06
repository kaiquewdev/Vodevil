var Vodevil = (function () {
    /*
        @description: A small module to help deal with arrays more easily.
        @call: var Vodevil = require('vodevil').core;
    */
    var core = function () {};

    // Internal methods, and properties.
    var __range__ = function ( left, right, jump ) {
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

    var __union__ = function ( left, right ) {    
        var output = [],
            l = 0, 
            leftLength = left.length,
            r = 0,
            rightLength = right.length;

        do {
            output.push( left[l] );
            
            l++;
        } while ( l < leftLength );

        do {
            output.push( right[r] ); 

            r++;
        } while ( r < rightLength );
            
        return output;
    };

    var __intersect__ = function ( target, fn ) {
        var output = [],
            t = 0,
            tLength = target.length;

        fn = fn || function () {};

        do {
            if ( typeof fn( target[t], t, output ) !== 'undefined' ) {
                output.push( fn( target[t], t, output ) ); 
            }

            t++;
        } while ( t < tLength ); 

        return output;
    };

    var __sail__ = function ( target, pointer ) {
        var output = []; 

        if ( target && typeof pointer === 'string' ) {
            if ( pointer.indexOf(':') > -1 && pointer.indexOf('::') === -1 ) {
                pointer = pointer.split(':');

                var p = 0,
                    end = target.length;

                do {
                    if ( p >= parseInt( pointer[0], 10 ) && p <= parseInt( pointer[1], 10 ) ) {
                        output.push( target[p] );
                    } else if ( p >= parseInt( pointer[0], 10 ) && !pointer[1] ) {
                        output.push( target[p] );
                    } else if ( !pointer[0] && p <= parseInt( pointer[1], 10 ) ) {
                        output.push( target[p] ); 
                    }

                    p++;
                } while ( p < end );
            } else if ( pointer.indexOf('::') > -1 ) {
                target = target.reverse();
                
                pointer = pointer.split('::');

                var p = 0,
                    end = target.length;

                do {
                    if ( p >= parseInt( pointer[0], 10 ) && p <= parseInt( pointer[1], 10 ) ) {
                        output.push( target[p] );
                    } else if ( p >= parseInt( pointer[0], 10 ) && !pointer[1] ) {
                        output.push( target[p] );
                    } else if ( !pointer[0] && p <= parseInt( pointer[1], 10 ) ) {
                        output.push( target[p] ); 
                    }

                    p++;
                } while ( p < end );
            }   
        }

        return output;    
    };

    // Public methods and properties.
    core.prototype = {
        isArray: function ( target ) {
            /*
                @description: Verify if is array.
                @syntax: Vodevil.isArray( [] ), @return: true
            */
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
            /*
                @description: Generate a alphabetic sequence or number sequence.
                @syntax: Vodevil.range('1..10'), @return: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                @syntax: Vodevil.range(1, 10), @return: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                @syntax: Vodevil.range('a..z'), @return: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            */
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
                } else if ( !pointer[0] && pointer[1] ) {
                    if ( pointer[1].search(/[0-9]/) > -1 ) {
                        output = __range__(
                            0,
                            parseInt( pointer[1], 10 )
                        );
                    } else if ( pointer[1].search(/[a-z|A-Z]/) > -1 ) {
                        output = __letter__( 
                            'a', 
                            pointer[1]
                        );
                    }     
                }
            } else if ( typeof left === 'number' && !right ) {
                output = __range__( 0, left );    
            }

            return output;
        },

        bang: function ( target, times ) {
            /*
                @description: Make a repetead sequence, of a value.
                @syntax: Vodevil.bang('', 3), @return: [ '', '', '' ] 
                @syntax: Vodevil.bang(1, 3), @return: [ 1, 1, 1 ] 
                @syntax: Vodevil.bang(null, 3), @return: [ null, null, null ] 
            */
            var output = [];

            if ( typeof times === 'number' ) {
                output = __bang__( target, times ); 
            }

            return output;
        },

        clean: function ( target, piece ) {
            /*
                @description: Remove unnecessary values in accordance with what you choose. Or by default.
                @syntax: Vodevil.clean( ['', 'hello'] ), @return: [ 'hello' ]
                @syntax: Vodevil.clean( ['', undefined, null, 'hello'] ), @return: [ 'hello' ]
            */
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

        union: function ( left, right ) {
            var output = [],
                self = this;

            if ( left, right ) {
                if ( self.isArray( left ) && self.isArray( right ) ) {
                    output = __union__( left, right );    
                } else if ( typeof left === 'string' && typeof right === 'string' ) {
                    left = left.split('');
                    right = right.split('');

                    output = __union__( left, right );
                } else if ( self.isArray( left ) && typeof right === 'string' ) {
                    right = right.split('');    

                    output = __union__( left, right );
                } else if ( typeof left === 'string' && self.isArray( right ) ) {
                    left = left.split('');    

                    output = __union__( left, right );
                }
            }

            return output;
        },

        intersect: function ( target, fn ) {
            var output = []

            if ( target && typeof fn === 'function' ) {
                output = __intersect__( target, fn );    
            }

            return output;
        },

        sail: function ( target, pointer ) {
            var output = [];

            output = __sail__( target, pointer );

            return output;
        },

        multiplex: function ( target, slice ) {
            var output = [],
                self = this,
                slice = slice || 3;    

            if ( self.isArray( target ) && target ) {
                var piece = [],
                    s = 0,
                    e = target.length;

                do {
                    piece.push( target[s] );    

                    if ( piece.length === slice ) {
                        output.push( piece );    

                        piece = [];
                    }
                    
                    s++;
                } while ( s < e );
            }

            return output;
        },

        flush: function ( target ) {
            var output = [],
                self = this;
            
            if ( self.isArray( target ) && target ) {
                output = target.toString().split(','); 
            }

            return output;
        }
    };

    return new core;
} ());

exports.core = Vodevil;
