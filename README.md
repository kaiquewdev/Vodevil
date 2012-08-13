Vodevil
=======

Help you easily deal with these arrays with the genie difficult to handle.

Installation
------------

> $ npm install vodevil

Call
----

> var vodevil = require('vodevil');

vodevil.range
-------------

> vodevil.range( 5 ) => [0, 1, 2, 3, 4, 5]

> vodevil.range( 2, 5 ) => [2, 3, 4, 5]

> vodevil.range( '..5' ) => [0, 1, 2, 3, 4, 5]

> vodevil.range( '2..5' ) => [2, 3, 4, 5]

> vodevil.range( 'b..f' ) => ['b', 'c', 'd', 'e', 'f']

> vodevil.range( '..c' ) => ['a', 'b', 'c']

> vodevil.range( 'A..C' ) => ['A', 'B', 'C']

> vodevil.range( 4, 'set' ) => {"objectId":"1iNFoLgCgzrg8muhL2s69A==","object":[0,1,2,3,4],"objectType":"set"}

vodevil.bang
------------

> vodevil.bang( '', 2 ) => ['', '']

> vodevil.bang( 'doug', 5 ) => ['doug', 'doug', 'doug', 'doug', 'doug']

> vodevil.bang( null, 2 ) => [null, null]

> vodevil.bang( undefined, 2 ) => [undefined, undefined]

> vodevil.bang( 'doug', 2, 'set' ) => {"objectId":"HS8VtP8/BotEzWZ+/q+aHw==","object":["doug","doug"],"objectType":"set"} 

vodevil.clean
-------------

> vodevil.clean( [undefined, 'doug', 'john'] ) => ['doug', 'john']

> vodevil.clean( [null, 'doug', 'john'] ) => ['doug', 'john']

> vodevil.clean( [ 100, 'doug', 'john'], 100 ) => ['doug', 'john']

> vodevil.clean( vodevil.set([null, undefined, 'hello']) ) => {"objectId":"Hwv1A45hlRqVxKKp23xACg==","object":["hello"],"objectType":"set"}

vodevil.isArray
---------------

> vodevil.isArray( [] ) => true

> vodevil.isArray('[1, 2, 3]') => false

> vodevil.isArray([1, 2, 3]) => true

vodevil.union
-------------

> vodevil.union( [1, 2, 3], [4, 5, 6] ) => [1, 2, 3, 4, 5, 6]

> vodevil.union( 'ab', ['c', 'd'] ) => ['a', 'b', 'c', 'd']

> vodevil.union( ['a', 'b'], 'cd' ) => ['a', 'b', 'c', 'd']

> vodevil.union( vodevil.set([1, 2]), vodevil.set([3, 4]) ) => {"objectId":"e9TGO6LNrbBg9XMOe/ZqMA==","object":[1,2,3,4],"objectType":"set"}

vodevil.intersect
-----------------

> vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x*2; }) => [2, 4, 6, 8, 10]

> vodevil.intersect( [1, 2, 3], function ( item, index, array ) { console.log( x ); } ) => []

> vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x 2; }, ':2' ) => [2, 4, 6]

> vodevil.intersect( [1, 2, 3, 4, 5, 6], function ( x ) { return x*2 }, '2::' ) => [6, 4, 2]

> vodevil.intersect(vodevil.set([1, 2, 3]), function ( x ) { return x*2; }, '0::') => {"objectId":"gJcLFZFsurEYyxd2AoHtmw==","object":[6,4,2],"objectType":"set"}

vodevil.sail
------------

> vodevil.sail( [1, 2, 3, 4, 5], '2:' ) => [3, 4, 5]

> vodevil.sail( [1, 2, 3, 4, 5], '2::' ) => [3, 2, 1]

> vodevil.sail( [1, 2, 3, 4, 5, 6], '2:3' ) => [3, 4]

> vodevil.sail( vodevil.set([1, 2, 3, 4, 5]), '1::2' ) => {"objectId":"rbBriOAOruCuo6iA2wO2ow==","object":[4,3],"objectType":"set"}

vodevil.flush
-------------

> vodevil.flush( [1, [2, [3, [4, [5, [6, [7, [8, [9, [0]]]]]]]]]] ) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

> vodevil.flush( vodevil.set([1, [2, [3]]]) ) => {"objectId":"C8HY9145nmC14yQ9IrxghA==","object":["1","2","3"],"objectType":"set"}

vodevil.in
----------

> vodevil.in([1, 2, 3, 4], 4) => true

> vodevil.in([1, 2, 3, 4], 5) => false

> vodevil.in() => false

> vodevil.in( vodevil.set([1, 2, 3]), 3 ) => true

vodevil.set
-----------

>> Returned object: { objectId: (hash), object: [array], objectType: 'set' }

> vodevil.set([1, 2, 3]) => {"objectId": "8eRvMo5t7NVsZN1edh3Ctw==", "object": [1,2,3], "objectType": "set"} 

> vodevil.set([1, 2, 3]).equal( vodevil.set([1, 2, 3]) ) => true

> vodevil.set([1, 3, 4]).equal( vodevil.set([1, 2, 3]) ) => false

> vodevil.set([1, 2]).append(3) => [3]

> vodevil.set([1, 2]).append(3, 4, 5) => [3, 4, 5] 

> vodevil.set([1, 2, 3]).remove(1) => [1, 3]

> vodevil.set([1, 2, 3]).shift() => [2, 3]

> vodevil.set([1, 2, 3]).pop() => [1, 2]

vodevil.isSet
-------------

> vodevil.isSet([1, 2, 3]) => false

> vodevil.isSet( vodevil.set([1, 2, 3]) ) => true

License
-------

Copyright (c) 2012 Kaique da Silva <kaique.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
