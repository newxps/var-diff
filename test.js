const assert = require('assert');
const diff = require('.');


/**
 * t -> type 	1-create 2-delete 3-update 4-replace
 * p -> path{Array}
 * v -> value
 * i -> index
 */

let p;

p = diff.get('1', '1');
assert.equal(JSON.stringify(p), '[]')


p = diff.get('1', 2);
assert.equal(JSON.stringify(p), '[{"t":3,"p":[],"v":2}]');


// create
var a = {
	name: 'tom',
	age: 20
}
var b = {
	name: 'tom',
	age: 20,
	gender: 'male'
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


// delete
var a = {
	name: 'jack',
	age: 20,
}

var b = {
	name: 'jack',
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


// update
var a = {
	name: 'jack',
	age: 20
}

var b = {
	name: 'tom',
	age: 25
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


// sort and update
var a = {
	name: 'jack',
	list: [{
		id: 1,
		label: 'painter'
	}]
}

var b = {
	name: 'jack',
	list: Array(3)
}


p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


// sort and update
var a = {
	name: '张学友',
	list: [{
		id: 1,
		label: '歌神'
	}, {
		id: 2,
		label: '天王'
	}, {
		id: 3,
		label: '移动cd'
	}, {
		id: 5,
		label: '混合音响'
	}]
}

var b = {
	name: '刘德华',
	list: [{
		id: 2,
		label: '影帝'
	}, {
		id: 1,
		label: '慈善家'
	}, {
		id: 5,
		label: '歌手'
	}, 'what']
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));

// sort and update
var a = {
	name: '中国',
	list: [{
		id: 1,
		label: '北京'
	}, {
		id: 2,
		label: '上海'
	}, {
		id: 3,
		label: '深圳'
	}, {
		id: 5,
		label: '成都'
	}, {

	}, {
		id: 19
	}]
}

var b = {
	name: '美国',
	list: [{
		id: 5,
		label: '西雅图'
	}, {
		id: 1,
		label: '纽约'
	}, {
		id: 3,
		label: '洛杉矶'
	}, {
		id: 9,
		label: '迈阿密'
	}, {
		id: 19,
		label: '芝加哥'
	}, {
		id: 2,
		label: '拉斯维加斯',
		data: {
			user_id: 1234,
			code: 1,
			detail: {
				list: [{
					name: 'abcd',
					biz_type: 4
				}]
			}
		}
	}, {
		id: 11
	}],
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));





// sort and update
var a = {
	name: '美国',
	list: [{
		id: 5,
		label: '西雅图'
	}, {
		id: 1,
		label: '纽约'
	}, {
		id: 3,
		label: '洛杉矶'
	}, {
		id: 9,
		label: '迈阿密'
	}, {
		id: 19,
		label: '芝加哥'
	}, {
		id: 2,
		label: '拉斯维加斯',
		data: {
			user_id: 1234,
			code: 1,
			detail: {
				list: [{
					name: 'abcd',
					biz_type: 4
				}]
			}
		}
	}, {
		id: 11
	}],
}


var b = {
	name: '中国',
	list: [{
		id: 1,
		label: '北京'
	}, {
		id: 2,
		label: '上海'
	}, {
		id: 3,
		label: '深圳'
	}, {
		id: 5,
		label: '成都'
	}, {

	}, {
		id: 19
	}]
}

p = diff.get(a, b, 'id');
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));



// sort
var a = [1, 2, 3, 4, 5, 6]
var b = [3, 4]
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


// sort
var a = [4, 5, 6]
var b = [1, 2, 3, 4, 5, 6, 8]
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


var a = [];
var b = [1, 2, 3, 4, 5, 6, 7];
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


var a = [1, 2, 3, 4, 5, 6, 7];
var b = [];
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));



var a = [1, 2, 3, 4, 5]
var b = Array(3)
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


var a = [1, 2, 3, 4, 5]
var b = null;
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));


var a = null;
var b = 123;
p = diff.get(a, b);
var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));



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

var aa = diff.apply(a, p);
assert.equal(JSON.stringify(aa), JSON.stringify(b));	// true 

