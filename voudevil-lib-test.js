var chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    expect = chai.expect,
    sinon = require('sinon'),
    Voudevil = require('./voudevil').core;

// Vouvdevil lib main tests
describe('Voudevil Section of Tests', function () {
    describe('Array ranges', function () {
        it('Simple number range, with string by argument', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            Voudevil.range('1..10').should.equal( output );   
        });

        it('Simple number rang, with separated arguments', function () {
            var output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            Voudevil.range(1, 10).should.equal( output );
        });

        it('Fail if not receive argument', function () {
            Voudevil.range().should.equal( [] );    
        });
    });    
});
