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

})