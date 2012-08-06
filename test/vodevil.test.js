var chai = require('chai'),
    should = chai.should(),
    sinon = require('sinon'),
    Vodevil = require('../lib/vodevil').core;

// Vouvdevil lib main tests
describe('Vodevil Section of Tests: ', function () {
    describe('Array number ranges', function () {
        it(' - Simple number range, with string by argument', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].toString();

            Vodevil.range('1..10').toString().should.equal( output );
            Vodevil.range('1..10').should.have.length( 10 );
        });

        it(' - Simple number range, with separated arguments', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].toString();

            Vodevil.range(1, 10).toString().should.equal( output );
            Vodevil.range('1..10').should.have.length( 10 );
        });

        it(' - Fail if not receive argument', function () {
            Vodevil.range().should.have.length( 0 );    
        });

        it(' - ( Note: using number ) If receive one argument, make array from 0 to n', function () {
            var output = [0, 1, 2, 3, 4].toString();
            
            Vodevil.range(4).toString().should.equal( output );
        });

        it(' - ( Note: using string ) If receive one argument, make array from 0 to n', function () {
            var output = [0, 1, 2, 3, 4].toString();
            
            Vodevil.range('..4').toString().should.equal( output );
        });

        it (' - ( Note: using string ) If receive one argument, make array from a to n', function () {
            var output = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].toString();    

            Vodevil.range('..g').toString().should.equal( output );
        });
    });    

    describe('Array letter ranges', function () {
        it(' - Simple letter sequence', function () {
            var output = ['a', 'b', 'c'].toString();

            Vodevil.range('a..c').should.have.length( 3 );
            Vodevil.range('a..c').toString().should.equal( output );
        });

        it(' - Lower and Upper case range', function () {
            var output = ['A', 'B', 'C'].toString();

            Vodevil.range('A..C').should.have.length( 3 );
            Vodevil.range('A..C').toString().should.equal( output );
        });
    });

    describe('Array sequence of same value', function () {
        it(' - Fail if receive empty value', function () {
            Vodevil.bang().should.have.length( 0 );    
        });    

        it(' - String repetition', function () {
            var output = [' ', ' ', ' '].toString();

            Vodevil.bang(' ', 3).should.have.length( 3 );    
            Vodevil.bang(' ', 3).toString().should.equal( output );
        });

        it(' - Number repetition', function () {
            var output = [1, 1, 1, 1].toString();

            Vodevil.bang( 1, 4 ).should.have.length( 4 );
            Vodevil.bang( 1, 4 ).toString().should.equal( output );
        });

        it(' - Boolean repetition', function () {
            var output = [true, true, true].toString();

            Vodevil.bang( true, 3 ).should.have.length( 3 );
            Vodevil.bang( true, 3 ).toString().should.equal( output );
        });

        it(' - Undefined repetition', function () {
            var output = [undefined, undefined, undefined].toString();

            Vodevil.bang( undefined, 3 ).should.have.length( 3 );
            Vodevil.bang( undefined, 3 ).toString().should.equal( output );
        });

        it(' - Null repetition', function () {
            var output = [null, null, null].toString();

            Vodevil.bang( null, 3 ).should.have.length( 3 );
            Vodevil.bang( null, 3 ).toString().should.equal( output );
        });
    });

    describe('Clean array', function () {
        it(' - Return the same array, if not receive argument', function () {
            Vodevil.clean().should.have.length( 0 );
        });    

        it(' - Clean the empty string [ default ]', function () {
            var input = ['', 'hello'],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it(' - Clean the undefined [ default ]', function () {
            var input = [ undefined, 'hello' ],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it(' - Clean the null [ default ]', function () {
            var input = [ null, 'hello' ],
                output = ['hello'].toString();

            Vodevil.clean( input ).should.have.length( 1 );
            Vodevil.clean( input ).toString().should.equal( output );
        });

        it(' - Clean the piece', function () {
            var input = [ null, 'hello', 'octocat' ],
                output = ['octocat'].toString();    
            
            Vodevil.clean( input, 'hello' ).should.have.length( 1 );
            Vodevil.clean( input, 'hello' ).toString().should.equal( output );
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

        it('union array more string', function () {    
            var output = ['a', 'b', 'c', 'd'].toString();

            Vodevil.union( ['a', 'b'], 'cd' ).toString().should.equal( output );
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
    });

    describe('Array multiplex', function () {
        it('return default behavior', function () {
            var output = [[1, 2, 3], [4, 5, 6], [7, 8, 9]].toString();    

            Vodevil.multiplex( Vodevil.range('1..9') ).toString().should.equal( output );
        });    
    });

    describe('Array flush', function () {
        it('all deep flush', function () {
            var output = [1, 2, 3, 4, 5, 6].toString();    

            Vodevil.flush( [1, [2, [3, [4, [5, [6]]]]]] ).toString().should.equal( output );
        });    
    });
});
