var chai = require('chai'),
    should = chai.should(),
    Vodevil = require('../lib/vodevil').core;

// Vouvdevil lib main tests
describe('Vodevil Section of Tests: ', function () {
    describe('Array number ranges', function () {
        it(' - Simple number range, with string by argument', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].toString();

            Vodevil.range('1..10').toString().should.equal( output );
            Vodevil.range('1..10').should.have.length( 10 );
        });

        it('simple number range, with separated arguments', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].toString();

            Vodevil.range(1, 10).toString().should.equal( output );
            Vodevil.range('1..10').should.have.length( 10 );
        });

        it('fail if not receive argument', function () {
            Vodevil.range().should.have.length( 0 );    
        });

        it('( Note: using number ) If receive one argument, make array from 0 to n', function () {
            var output = [0, 1, 2, 3, 4].toString();
            
            Vodevil.range(4).toString().should.equal( output );
        });

        it('( Note: using string ) if receive one argument, make array from 0 to n', function () {
            var output = [0, 1, 2, 3, 4].toString();
            
            Vodevil.range('..4').toString().should.equal( output );
        });

        it ('( Note: using string ) if receive one argument, make array from a to n', function () {
            var output = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].toString();    

            Vodevil.range('..g').toString().should.equal( output );
        });

        it('setting a range using set object', function () {
            var output = Vodevil.set([1, 2, 3]);

            Vodevil.range('1..3', 'set').equal( output ).should.equal( true );
            Vodevil.range(1, 3, 'set').equal( output ).should.equal( true );
        });

        it('receive one argument and output defined to set', function () {
            var output = Vodevil.set([0, 1, 2, 3, 4]);

            Vodevil.range( 4, 'set' ).equal( output ).should.equal( true );
        });

        it('receive one argument and output defined to set using string', function () {
            var output = Vodevil.set([0, 1, 2, 3, 4]);

            Vodevil.range('..4', 'set').equal( output ).should.equal( true );
        });
    });    

    describe('Array letter ranges', function () {
        it('simple letter sequence', function () {
            var output = ['a', 'b', 'c'].toString();

            Vodevil.range('a..c').should.have.length( 3 );
            Vodevil.range('a..c').toString().should.equal( output );
        });

        it('lower and upper case range', function () {
            var output = ['A', 'B', 'C'].toString();

            Vodevil.range('A..C').should.have.length( 3 );
            Vodevil.range('A..C').toString().should.equal( output );
        });
    });

    describe('Array sequence of same value', function () {
        it(' - Fail if receive empty value', function () {
            Vodevil.bang().should.have.length( 0 );    
        });    

        it('string repetition', function () {
            var output = [' ', ' ', ' '].toString();

            Vodevil.bang(' ', 3).should.have.length( 3 );    
            Vodevil.bang(' ', 3).toString().should.equal( output );
        });

        it('number repetition', function () {
            var output = [1, 1, 1, 1].toString();

            Vodevil.bang( 1, 4 ).should.have.length( 4 );
            Vodevil.bang( 1, 4 ).toString().should.equal( output );
        });

        it('boolean repetition', function () {
            var output = [true, true, true].toString();

            Vodevil.bang( true, 3 ).should.have.length( 3 );
            Vodevil.bang( true, 3 ).toString().should.equal( output );
        });

        it('undefined repetition', function () {
            var output = [undefined, undefined, undefined].toString();

            Vodevil.bang( undefined, 3 ).should.have.length( 3 );
            Vodevil.bang( undefined, 3 ).toString().should.equal( output );
        });

        it('null repetition', function () {
            var output = [null, null, null].toString();

            Vodevil.bang( null, 3 ).should.have.length( 3 );
            Vodevil.bang( null, 3 ).toString().should.equal( output );
        });

        it('return a bang set', function () {
            var output = Vodevil.set( [null, null, null] );

            Vodevil.bang( null, 3, 'set' ).equal( output ).should.equal( true );
        });
    });

    describe('Clean array', function () {
        it(' - Return the same array, if not receive argument', function () {
            Vodevil.clean().should.have.length( 0 );
        });    

        it('clean the empty string [ default ]', function () {
            var input = ['', 'hello'],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it('clean the undefined [ default ]', function () {
            var input = [ undefined, 'hello' ],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it('clean the null [ default ]', function () {
            var input = [ null, 'hello' ],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it('clean the piece', function () {
            var input = [ null, 'hello', 'octocat' ],
                output = ['octocat'].toString();    
            
            Vodevil.clean( input, 'hello' ).should.have.length( 1 );
            Vodevil.clean( input, 'hello' ).toString().should.equal( output );
        });

        it('clean set object', function () {
            var input = Vodevil.set([null, undefined, 'hello', 'octocat']),
                output = Vodevil.set(['hello', 'octocat']);

            Vodevil.clean( input ).equal( output ).should.equal( true );
        });
    });

    describe('Array checking type', function () {
        it('if not is array return false', function () {
            Vodevil.isArray().should.equal( false );    
            Vodevil.isArray( 'hello' ).should.equal( false );    
            Vodevil.isArray( 1 ).should.equal( false );    
            Vodevil.isArray( (function () { return function () {}; } ())).should.equal( false );    
        });    

        it('if is array return true', function () {
            Vodevil.isArray([]).should.equal( true );    
            Vodevil.isArray([1, 2, 3, 4]).should.equal( true );    
            Vodevil.isArray(['just', 'another', 'array']).should.equal( true );    
        });

        it('if set object', function () {
            var input = Vodevil.set([1, 2, 3]);

            Vodevil.isArray( input ).should.equal( false );
        });
    });

    describe('Array union', function () {
        it('union by two arrays', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8].toString();

            Vodevil.union( [1, 2, 3, 4], [5, 6, 7, 8] ).toString().should.equal( output );    
        });    

        it('fail if not receive arguments', function () {
            var output = [];

            Vodevil.union().should.have.length( 0 );
        });

        it('union strings', function () {
            var output = ['a', 'b', 'c', 'd'].toString();    

            Vodevil.union('ab', 'cd').toString().should.equal( output );
        });

        it('union string more array', function () {
            var output = ['a', 'b', 'c', 'd'].toString();    

            Vodevil.union( 'ab', ['c', 'd'] ).toString().should.equal( output );
        });

        it('array more string', function () {    
            var output = ['a', 'b', 'c', 'd'].toString();

            Vodevil.union( ['a', 'b'], 'cd' ).toString().should.equal( output );
        });

        it('using set object', function () {
            var input = [
                    Vodevil.set(['a', 'b']),
                    Vodevil.set(['c', 'd'])
                ],
                output = Vodevil.set(['a', 'b', 'c', 'd']);    

            Vodevil.union( input[0], input[1] )
                .equal( output )
                .should
                .equal( true );
        });
    });

    describe('Array intersect', function () {
        it('multiplication in the intersection', function () {
            var output = [2, 4, 6, 8, 10].toString();    

            Vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x*2 } ).toString().should.equal( output );
        });

        it('work with arguments', function () {
            var output = [{'0': 1, 'o': []}, {'1': 2, 'o': [1]}, {'2': 3, 'o': [2]}].toString();

            Vodevil.intersect( [1, 2, 3], function ( x, i, o ) { return { i: x, 'o': o} }).toString().should.equal( output );
        });

        it('not insert undefined if not return value', function () {
            Vodevil.intersect( [1, 2, 3], function ( x, i, o ) {}).should.have.length( 0 );    
        });

        it('sail in intersect', function () {
            var output = [2, 4, 6].toString();

            Vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x*2; }, '0:2' ).toString().should.equal( output );    
        });

        it('reverse intersect', function () {
            var output = [6, 4, 2].toString();

            Vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x*2;}, '2::' ).toString().should.equal( output );    
        });

        it('intersect using set object', function () {
            var input = Vodevil.set([1, 2, 3, 4]),
                output = Vodevil.set([2, 4, 6, 8]);

            Vodevil.intersect( input, function ( item ) {
                return item * 2;
            }).equal( output ).should.equal( true );
        });
    });

    describe('Array sail', function () {
        it('from a point to end', function () {
            var output = [3, 4, 5].toString();    

            Vodevil.sail( [1, 2, 3, 4, 5], '2:' ).toString().should.equal( output );
        });    

        it('from a point to start', function () {
            var output = [1, 2].toString();    

            Vodevil.sail( [1, 2, 3, 4, 5], ':1' ).toString().should.equal( output );
        });    

        it('from two spec points', function () {
            var output = [3, 4].toString();

            Vodevil.sail( [1, 2, 3, 4, 5, 6], '2:3' ).toString().should.equal( output );
        });

        it('reverse travel', function () {
            var output = [4, 3, 2, 1].toString();

            Vodevil.sail( [1, 2, 3, 4], '0::' ).toString().should.equal( output );
        });    

        it('reverse travel by two points', function () {
            var output = [5, 4].toString();

            Vodevil.sail( [1, 2, 3, 4, 5], '0::1' ).toString().should.equal( output );
        });

        it('start to end', function () {
            var output = [3, 2, 1].toString();    

            Vodevil.sail( [1, 2, 3, 4, 5], '2::' ).toString().should.equal( output );
        });

        it('working with set object', function () {
            var input = Vodevil.set([1, 2, 3, 4, 5]),
                output = Vodevil.set([3, 2, 1]);     

            Vodevil.sail( input, '2::' ).equal( output ).should.equal( true );
        });
    });

    describe('Array flush', function () {
        it('all deep flush', function () {
            var output = [1, 2, 3, 4, 5, 6].toString();    

            Vodevil.flush( [1, [2, [3, [4, [5, [6]]]]]] ).toString().should.equal( output );
        });    

        it('working set object', function () {
            var input = Vodevil.set( [1, [2, [3]]] ),
                output = Vodevil.set( ['1', '2', '3'] );

            Vodevil.flush( input ).equal( output ).should.equal( true )
        });
    });

    describe('Array isSet', function () {
        it('verify if type is set', function () {
            Vodevil.isSet( Vodevil.set([1, 2, 3]) ).should.equal( true );    
        });

        it('Verify if type not is set', function () {
            Vodevil.isSet([1, 2, 3]).should.equal( false );    
        });

        it('empty parameter return false', function () {
            Vodevil.isSet().should.equal( false );    
        });
    });

    describe('Array in', function () {
        it('item in array', function () {
            Vodevil.in( [1, 2, 3], 2 ).should.equal( true );
        });    

        it('item not in array', function () {
            Vodevil.in( [1, 2, 3, 4], 5 ).should.equal( false );
        });

        it('empty parameter return false', function () {
            Vodevil.in().should.equal( false );    
        });

        it('Working with set object', function () {
            var o = Vodevil.set([1, 2, 3]);
            
            Vodevil.in(o, 1).should.equal( true );    
        });
    });

    describe('Array set', function () {
        it('testing setting object', function () {
            var output = {
                objectId: 'e9TGO6LNrbBg9XMOe/ZqMA==',
                object: [1, 2, 3, 4],
                objectType: 'set',
            };

            Vodevil.set([1, 2, 3, 4]).objectId.should.equal( output.objectId );
            Vodevil.set([1, 2, 3, 4]).objectType.should.equal( output.objectType );
            Vodevil.set([1, 2, 3, 4]).object.should.have.length( output.object.length );
        });   

        it('equal property', function () {
            var target = [1, 2, 3, 4],
                a = Vodevil.set(target),
                b = Vodevil.set(target);

            a.equal(b).should.equal( true );
        });

        it('equal is empty return false', function () {
            Vodevil.set([1, 2]).equal( false );    
        });
    });

    describe('Array append', function () {
        it('a value', function () {
            var input = Vodevil.set([1, 2, 3]),
                value = 4,
                output = Vodevil.set( [1, 2, 3, 4] );

            input.append(value);

            input.equal( output ).should.equal( true );
        });    

        it('list values', function () {
            var input = Vodevil.set([1, 2]),
                output = Vodevil.set([1, 2, 3 ,4]);

            input.append( 3, 4 );

            input.equal( output ).should.equal( true );
        });
    });

    describe('Array remove', function () {
        it('removing item', function () {
            var input = Vodevil.set([1, 2, 3]),
                output = Vodevil.set([1, 2]);

            input.remove(2);

            input.equal( output ).should.equal( true );
        });   

        it('fail because, not receive more than one argument', function () {
            var input = Vodevil.set([1, 2, 3]);

            input.remove(2, 3, 4).should.equal( false );
        });

        it('pop action', function () {
            var input = Vodevil.set([1, 2, 3, 4]),
                output = Vodevil.set([1, 2, 3]);    

            input.pop();

            input.equal( output ).should.equal( true );
        });

        it('shift action', function () {
            var input = Vodevil.set([1, 2, 3]),
                output = Vodevil.set([2, 3]);

            input.shift();

            input.equal( output ).should.equal( true );
        });
    });
});
