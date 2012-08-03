var chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    expect = chai.expect,
    sinon = require('sinon'),
    Voudevil = require('../lib/voudevil').core;

// Vouvdevil lib main tests
describe('Voudevil Section of Tests: ', function () {
    describe('Array number ranges', function () {
        it(' - Simple number range, with string by argument', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            // Array aspect
            Voudevil.range('1..10').toString().should.equal( output.toString() );
            // Array length
            Voudevil.range('1..10').should.have.length( 10 );
        });

        it(' - Simple number range, with separated arguments', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            // Array aspect
            Voudevil.range(1, 10).toString().should.equal( output.toString() );
            // Array length
            Voudevil.range('1..10').should.have.length( 10 );

        });

        it(' - Fail if not receive argument', function () {
            Voudevil.range().should.have.length( 0 );    
        });
    });    

    describe('Array letter ranges', function () {
        it (' - Simple letter sequence', function () {
            var output = ['a', 'b', 'c'];

            Voudevil.range('a..c').should.have.length( 3 );
        });
    });
});
