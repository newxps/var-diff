

# var-diff

get the difference between two variables

### Compatibility
|  IE      | Chrome |  Firefox | Opera |  Safari     |
|   :-:    |  :-:   |   :-:    | :-:   |   :--:      |
|    ✔️    |   ✔️   |   ✔️     |  ✔️  |   ✔️        |
### Installation

```bash
npm i -S var-diff
```
or
```html
<script src="var-diff.js"></script>
```

### Usage

use `var patches = diff.get(origin, target, [key])` to get difference `patches` between origin and target variables.

`key` is an optional parameter used to improve sorting performance.
`patches` is an array containing all of the differences betwen two variables

```
// patches
t: type   1-create 2-delete 3-edit 4-replace
p: path {Array}
v: value
i: new index(when type is replace)
```

use `diff.apply(origin, patches)` to make the origin variable apply the `patches` then become the target varible. but all references of the origin variable are reserved.

```javascript
const diff = require('var-diff');

let a = [1, 2, 3, {id: 1, name: 'tom'}, {id: 2, name: 'jack'}]
let b = [2, {id: 2, name: 'will'}, 3, {id: 1, name: 'lucy'}]

let patches = diff.get(origin, target, 'id');
console.log(patches);

/**
 * patches
[ 
  { t: 2, p: [ 0 ] },                       // remove the 0th element 
  { t: 3, p: [ 2, 'name' ], v: 'lucy' },    // update the name of the 2th element to 'lucy'
  { t: 3, p: [ 3, 'name' ], v: 'will' },    // update the name of the 3th element to 'will'
  { t: 4, p: [ 3 ], i: 1 },                 // change the 3th element to the 1th position
  { t: 4, p: [ 3 ], i: 2 }                  // change the 3th element to the 2th position
]
 */


a = diff.apply(a, patches);

console.log(JSON.stringify(a) === JSON.stringify(b));

// true
```



### Examples

```javascript
var a = {
  name: 'tom',
  gender: 'male',
  list: [{
    id: 1,
    label: 'teacher'
  }]
}

var b = {
  name: 'jack',
  list: [{
    id: 2,
    label: 'worker'
  }, {
    id: 3,
    label: 'student'
  }, {
    id: 1,
    label: ''
  }]
}

p = diff.get(a, b, 'id');

console.log(p);
/**
  t: type   1-create 2-delete 3-edit 4-replace
  p: path {Array}
  v: value
  i: new index(when type is replace)

 [{ t: 3, p: [ 'name' ], v: 'jack' },
  { t: 2, p: [ 'gender' ] },
  { t: 3, p: [ 'list', 0, 'label' ], v: '' },
  { t: 1, p: [ 'list', 1 ], v: { id: 2, label: 'worker' } },
  { t: 1, p: [ 'list', 2 ], v: { id: 3, label: 'student' } },
  { t: 4, p: [ 'list', 0 ], i: 2 },
  { t: 4, p: [ 'list', 1 ], i: 0 },
  { t: 1, p: [ 'age' ], v: 25 }]
 */

var aa = diff.apply(a, p, 'id'); // key
console.log(JSON.stringify(aa) === JSON.stringify(b));  // true
```


```javascript
var a = [NaN, NaN];
var b = [NaN, NaN];

var p = diff.get(a, b, 'id');

console.log(p); // []
```


### LICENSE
MIT