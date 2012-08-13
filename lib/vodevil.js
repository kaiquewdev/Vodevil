var Vodevil = (function () {
    /*
        @description: A small module to help deal with arrays more easily.
        @call: var Vodevil = require('vodevil').core;
    */
    var core = function () {};

    // Core set object to manager arrays
    var settings = {
        // hash of arrays inserted
        references: [],
        //  number to compose hash
        counter: 0,
    };

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

    var __hash__ = function ( input ) {
        var crypto = require('crypto');

        var hash = crypto.createHash('md5');
            hash.update( input );

        return hash.digest('base64');
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

        isSet: function ( target ) {
            var output = false;    

            if ( 
                target && 
                typeof target['objectType'] !== undefined && 
                target['objectType'] === 'set' 
            ) {
                output = true; 
            }

            return output;
        },

        range: function ( left, right, type ) {
            /*
                @description: Generate a alphabetic sequence or number sequence.
                @syntax: Vodevil.range('1..10'), @return: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                @syntax: Vodevil.range(1, 10), @return: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                @syntax: Vodevil.range('a..z'), @return: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
            */
            var self = this,
                output = [];

            if ( typeof left === 'number' && typeof right === 'number' ) {
                output = __range__( left, right );

                if ( typeof type !== undefined && type === 'set' ) {
                    output = self.set( output );    
                }
            } else if ( typeof left === 'string' ) {
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

                if ( right === 'set' ) {
                    output = self.set( output );    
                }  
            } else if ( typeof left === 'number' ) {
                if ( typeof right !== undefined ) {
                    output = __range__( 0, left );    

                    if ( right === 'set' ) {
                        output = self.set( output );    
                    }
                }
            }

            return output;
        },

        bang: function ( target, times, type ) {
            /*
                @description: Make a repetead sequence, of a value.
                @syntax: Vodevil.bang('', 3), @return: [ '', '', '' ] 
                @syntax: Vodevil.bang(1, 3), @return: [ 1, 1, 1 ] 
                @syntax: Vodevil.bang(null, 3), @return: [ null, null, null ] 
            */
            var self = this,
                output = [];

            if ( typeof times === 'number' ) {
                output = __bang__( target, times ); 

                if ( typeof type !== undefined && type === 'set' ) {
                    output = self.set( output );    
                }
            }

            return output;
        },

        clean: function ( target, piece ) {
            /*
                @description: Remove unnecessary values in accordance with what you choose. Or by default.
                @syntax: Vodevil.clean( ['', 'hello'] ), @return: [ 'hello' ]
                @syntax: Vodevil.clean( ['', undefined, null, 'hello'] ), @return: [ 'hello' ]
            */
            var self = this,
                output = target || [],
                blackList = ['', null];

            if ( output && self.isSet( output ) ) {
                output = output.object;

                for ( var item in blackList ) {
                    output = __clean__( output, blackList[ item ] );    
                }

                if ( piece ) {
                    output = __clean__( output, piece );
                }
                
                output = self.set( output );
            } else if ( output && !self.isSet( output ) ) {
                for ( var item in blackList ) {
                    output = __clean__( output, blackList[ item ] );   
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
                } else if ( self.isSet( left ) && self.isSet( right ) ) {
                    left = left.object;
                    right = right.object;

                    output = __union__( left, right );
                    output = self.set( output );
                }
            }

            return output;
        },

        intersect: function ( target, fn, track ) {
            var output = [],
                self = this;

            if ( self.isSet( target ) ) {
                target = target.object;
                
                if ( typeof track === 'string' ) {
                    target = self.sail( target, track );     
                } 

                output = __intersect__( target, fn );
                output = self.set( output );
            } else if ( self.isArray( target ) && typeof fn === 'function' ) {
                if ( typeof track === 'string' ) {
                    target = self.sail( target, track );
                }

                output = __intersect__( target, fn );    
            }

            return output;
        },

        sail: function ( target, pointer ) {
            var self = this,
                output = [];

            if ( self.isSet( target ) ) {
                target = target.object;    

                output = __sail__( target, pointer );
                output = self.set( output );
            } else if ( !self.isSet( target ) ) {
                output = __sail__( target, pointer );
            }

            return output;
        },

        flush: function ( target ) {
            var output = [],
                self = this;
            
            if ( self.isSet( target ) && target ) {
                target = target.object;
                output = target.toString().split(',');
                output = self.set( output );
            } else if ( self.isArray( target ) && target ) {
                output = target.toString().split(','); 
            }

            return output;
        },

        in: function ( target, item ) {
            var self = this,
                output = false;

            if ( self.isSet( target ) ) {
                target = target.object;
            } if ( target && self.isArray( target ) ) {
                self.intersect(
                    target,
                    function ( i ) {
                        if ( i === item ) {
                            output = true;
                        }
                    }
                );
            }

            return output;
        },

        set: function ( target ) {
            var self = this,
                crypto = require('crypto'),
                output = {};    

            if ( target && self.isArray( target ) ) {
                output = {
                    objectId: '',
                    object: [],
                    objectType: 'set'
                };
                
                settings['counter'] += 1; 

                output['objectId'] = __hash__(
                    JSON.stringify( target )
                );
                
                if ( 
                    !self.in( settings['references'], output['objectId'] ) 
                ) {
                    settings['references'].push( output['objectId'] );
                }
                
                output['object'] = target;

                // Equal set object function
                output['equal'] = function ( target ) {
                    return output.objectId === target.objectId;
                };

                // Append set object function
                output['append'] = function () {
                    var output = [],
                        args = Array.prototype.slice.call( arguments ),
                        o = this;

                    self.intersect( args, function ( item ) {
                        output.push(
                            o['object'].push( item )
                        );    

                        settings['counter'] += 1;
                    });

                    o['objectId'] = __hash__(
                        JSON.stringify( o['object'] )
                    );
                    
                    if ( 
                        !self.in( settings['references'], o['objectId'] ) 
                    ) {
                        settings['references'].push( o['objectId'] );
                    }

                    return output;
                };

                // Remove item from array
                output['remove'] = function ( value ) {
                    var output = false,
                        args = Array.prototype.slice.call( arguments ),
                        o = this,
                        matrix = o['object'];

                    if ( args.length === 1 ) {
                        matrix = self.intersect( 
                            matrix, 
                            function ( item, index ) {
                                if ( value !== index ) {
                                    return item;    
                                }
                        });

                        settings['counter'] += 1;
                        
                        o['object'] = matrix;

                        o['objectId'] = __hash__(
                            JSON.stringify( o['object'] )
                        );

                        if ( 
                            !self.in( settings['references'], o['objectId'] ) 
                        ) {
                            settings['references'].push( o['objectId'] );    
                        } if ( typeof o['object'] !== undefined ) {
                            output = true;    
                        }
                    }

                    return output;
                };

                // Pop, to remove last item
                output['pop'] = function () {
                    var output = false,
                        o = this;

                    if ( o['object'].length > 0 ) {
                        output = o['remove']( o['object'].length - 1 );    
                    }

                    return output;
                };

                // Shift, to remove the first item
                output['shift'] = function () {
                    var output = false,
                        o = this;

                    if ( o['object'].length > 0 ) {
                        output = o['remove']( 0 );    
                    }

                    return output;
                };
            }

            return output;
        },
    };

    return new core;
} ());

exports.core = Vodevil;
