const assert = require('assert');
const diff = require('..');


describe('数组类型', function () {
  describe(`
    var a = [1, Infinity, 3, NaN, 5, 1e80]
    var b = [3, 4]

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [1, Infinity, 3, NaN, 5, 1e80]
      var b = [3, 4]

      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [1, 2, 3]
    var b = [1, 2, 3]

    var p = diff.get(a, b);
  `, function () {
    it(`p 应该是空数组`, function () {
      var a = [1, 2, 3]
      var b = [1, 2, 3]

      var p = diff.get(a, b);
      assert.ok(p.length === 0);
    });
  });

  describe(`
  根据key排序:

    var a = [{
      id: 123,
      name: '刘德华',
      age: 55
    }, {
      id: 124,
      name: '周杰伦',
      age: 40
    }, {
      id: 125,
      name: '王力宏',
      age: 43
    }]
    
    var b = [{
      id: 124,
      name: '田震',
      age: 40
    }, {
      id: 125,
      name: '莫文蔚',
      age: 35
    }, {
      id: 123,
      name: '林俊杰',
      age: 36
    }, {
      id: 126,
      name: '孙楠',
      age: 48
    }]

    var p = diff.get(a, b, 'id');
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [{
        id: 123,
        name: '刘德华',
        age: 55
      }, {
        id: 124,
        name: '周杰伦',
        age: 40
      }, {
        id: 125,
        name: '王力宏',
        age: 43
      }]
      
      var b = [{
        id: 124,
        name: '田震',
        age: 40
      }, {
        id: 125,
        name: '莫文蔚',
        age: 35
      }, {
        id: 123,
        name: '林俊杰',
        age: 36
      }, {
        id: 126,
        name: '孙楠',
        age: 48
      }]

      var p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
  混合类型排序:

    var a = ['丽江', 1, 2, 3, 4, {id: 123, name: '刘德华'}, '黄山', {id: 124, name: '周杰伦'}, {id: 125, name: '王力宏'}, '九寨沟']
    var b = [{id: 125, name: '王力宏'}, {id: 123, name: '刘德华'}, '九寨沟', '黄山', {id: 124, name: '周杰伦'}, '丽江', '三亚']

    var p = diff.get(a, b, 'id');
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = ['丽江', 1, 2, 3, 4, {id: 123, name: '刘德华'}, '黄山', {id: 124, name: '周杰伦'}, {id: 125, name: '王力宏'}, '九寨沟']
      var b = [{id: 125, name: '王力宏'}, {id: 123, name: '刘德华'}, '九寨沟', '黄山', {id: 124, name: '周杰伦'}, '丽江', '三亚']

      var p = diff.get(a, b, 'id');
      console.log(p);

      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [4, 5, 6]
    var b = [1, 2, 3, 4, 5, 6, 8]

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [4, 5, 6]
      var b = [1, 2, 3, 4, 5, 6, 8]
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [];
    var b = [1, 2, 3, 4, 5, 6, 7];

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [];
      var b = [1, 2, 3, 4, 5, 6, 7];
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [1, 2, 3, 4, 5, 6, 7];
    var b = [];

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [1, 2, 3, 4, 5, 6, 7];
      var b = [];
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [1, 2, 3, 4, 5]
    var b = Array(3)

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [1, 2, 3, 4, 5]
      var b = Array(3)
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [1, 2, 3, 4, 5]
    var b = null;

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [1, 2, 3, 4, 5]
      var b = null;
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [1, 2, 3, 4, 5]
    var b = null;

    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [1, 2, 3, 4, 5]
      var b = null;
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = [{
      name: 'tom',
      age: 20,
      undefined: 1
    }, {
      name: 'jack',
      age: 30,
      undefined: 1
    }];

    var b = [{
      name: 'lucy',
      age: 20,
      undefined: 1
    }, {
      name: 'jack',
      age: 30,
      undefined: 1
    }];
    var p = diff.get(a, b);
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = [{
        name: 'tom',
        age: 20,
        undefined: 1
      }, {
        name: 'jack',
        age: 30,
        undefined: 1
      }];

      var b = [{
        name: 'lucy',
        age: 20,
        undefined: 1
      }, {
        name: 'jack',
        age: 30,
        undefined: 1
      }];
      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });


  var arr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    , NaN
    , Infinity, -Infinity
    , Number.MAX_VALUE
    , Number.EPSILON
    , ...'abcdefghijklmnopqrstuvwxyz'.split('')
    , ...'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    , void 0
    , NaN
    , true
    , false
    , 3e3
    , null
    , [1, 2, 3]
    , [2, 4, 6]
    , [6, 7, 8]
    , ''
    , {id: 1, name: 'tom', age: 18}
    , {id: 2, name: 'lucy', gender: 'female', label: ['singer']}
    , {id: 3, name: 'lily'}
    , {id: 4, name: 'jack'}
    , {id: 5, name: 'lucy'}
    , {id: 6, name: 'micheal'}
    , {id: 7, name: 'timi'}
    , {id: 8, name: 'steve'}
    , {id: 9, name: 'dannie'}
    , {id: 10, name: 'dannis'}
    , {id: 11, name: 'jim'}
    , {id: 12, name: 'duck'}
    , {id: 13, name: 'will'}
    , {id: 14, name: 'robin'}
    , {id: 15, name: 'bruce'}
    , {id: 16, name: 'vicky'}
    , {id: 17, name: 'peter'}
    , {id: 18, name: 'chester'}
    , {id: 19, name: 'sunny'}
    , {id: 20, name: 'fransis'}
    , {id: 21, name: 'thonas'}
    , {id: 22, name: 'rogers'}
    , {id: 23, name: 'tony'}
    , {id: 24, name: 'wayne'}
    , {id: 25, name: 'hulk'}
    , {id: 26, name: 'bill'}
    , {id: 27, name: 'mary'}
    , {id: 28, name: 'kevin'}
    , {id: 29, name: 'james'}
    , {id: 30, name: 'david'}
    , {id: 31, name: 'jean'}
    , {id: 32, name: 'judy'}
    , {id: 33, name: 'van'}
    , {id: 34, name: 'amy'}
    , {id: 35, name: 'tina'}
  ]
  var l = arr.length;

  var getRandomArr = function () {
    var len = Math.random() * 1000 | 0;
    var a = Array(len);
    for (var i = 0; i < len; i++) {
      a[i] = arr[Math.random() * l | 0];
    }
    return a;
  }

  describe(`随机数组测试`, function () {
    for (var i = 0; i < 1000; i++) (function () {
      var a = getRandomArr();
      var b = getRandomArr();

      it(`随机数组测试 ${i}`, function() {
        p = diff.get(a, b);
        var aa = diff.apply(a, p, 'id');

        aa = JSON.stringify(aa);
        b = JSON.stringify(b);

        try {
          assert.equal(aa, b);
        } catch (e) {
          console.log(aa);
          console.log(b);
          throw e;
        }
      });
    })()
  });


})