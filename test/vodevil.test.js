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
});
