

# var-diff

js diffing algorithm

### Features
* diffing two variables

### Installation

```bash
npm i -S var-diff
```
or
```html
<script src="var-diff.js"></script>
```

### Usage

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

var aa = diff.apply(a, p);
console.log(JSON.stringify(aa) === JSON.stringify(b));  // true
```