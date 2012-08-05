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

vodevil.bang
------------

> vodevil.bang( '', 2 ) => ['', '']

> vodevil.bang( 'doug', 5 ) => ['doug', 'doug', 'doug', 'doug', 'doug']

> vodevil.bang( null, 2 ) => [null, null]

> vodevil.bang( undefined, 2 ) => [undefined, undefined]

vodevil.clean
-------------

> vodevil.clean( [undefined, 'doug', 'john'] ) => ['doug', 'john']

> vodevil.clean( [null, 'doug', 'john'] ) => ['doug', 'john']

> vodevil.clean( [ 100, 'doug', 'john'], 100 ) => ['doug', 'john']

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

vodevil.intersect
-----------------

> vodevil.intersect( [1, 2, 3, 4, 5], function ( x ) { return x*2; }) => [2, 4, 6, 8, 10]

> vodevil.intersect( [1, 2, 3], function ( item, index, array ) { console.log( x ); } ) => []

-----------------------------------

feedback kaique.developer@gmail.com
