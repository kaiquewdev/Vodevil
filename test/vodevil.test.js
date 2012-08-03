var chai = require('chai'),
    should = chai.should(),
    sinon = require('sinon'),
    Vodevil = require('../lib/vodevil').core;

// Vouvdevil lib main tests
describe('Vodevil Section of Tests: ', function () {
    describe('Array number ranges', function () {
        it(' - Simple number range, with string by argument', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            // Array aspect
            Vodevil.range('1..10').toString().should.equal( output.toString() );
            // Array length
            Vodevil.range('1..10').should.have.length( 10 );
        });

        it(' - Simple number range, with separated arguments', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            // Array aspect
            Vodevil.range(1, 10).toString().should.equal( output.toString() );
            // Array length
            Vodevil.range('1..10').should.have.length( 10 );

        });

        it(' - Fail if not receive argument', function () {
            Vodevil.range().should.have.length( 0 );    
        });
    });    

    describe('Array letter ranges', function () {
        it(' - Simple letter sequence', function () {
            var output = ['a', 'b', 'c'];

            Vodevil.range('a..c').should.have.length( 3 );
        });

        it(' - Lower and Upper case range', function () {
            var output = ['A', 'B', 'C'];

            Vodevil.range('A..C').should.have.length( 3 );
        });
    });

    describe('Array sequence of same value', function () {
        it(' - Fail if receive empty value', function () {
            Vodevil.bang().should.have.length( 0 );    
        });    

        it(' - String repetition', function () {
            var output = ' , , ';

            Vodevil.bang(' ', 3).should.have.length( 3 );    
            Vodevil.bang(' ', 3).toString().should.equal( output );
        });

        it(' - Number repetition', function () {
            var output = '1,1,1,1';

            Vodevil.bang( 1, 4 ).should.have.length( 4 );
            Vodevil.bang( 1, 4 ).toString().should.equal( output );
        });

        it(' - Boolean repetition', function () {
            var output = 'true,true,true';

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
});
