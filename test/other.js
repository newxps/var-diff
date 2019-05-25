const assert = require('assert');
const diff = require('..');

describe('其他测试', function () {
  describe(`
    var x = new Set([1, 2, 3]);
    var y = [1, 2]
    var z = {x, y};

    var a = {x, y, z};
    var b = {x};
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var x = new Set([1, 2, 3]);
      var y = [1, 2]
      var z = {x, y};

      var a = {x, y, z};
      var b = {x};

      var p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });


  describe(`
    var a = {a: NaN, b: 4, c: 5};
    var b = {a: NaN, b: Infinity, c: 1e5, d: 0x20};
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = {a: NaN, b: 4, c: 5};
      var b = {a: NaN, b: Infinity, c: 1e5, d: 0x20};

      var p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
    var a = {a: NaN, b: 4, c: 5, d: 020, e: Symbol(1)};
    var b = {a: NaN, b: Infinity, c: 1e5, d: 0x20, e: Symbol(1)};
  `, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = {a: NaN, b: 4, c: 5, d: 020, e: Symbol(1)};
      var b = {a: NaN, b: Infinity, c: 1e5, d: 0x20, e: Symbol(1)};

      p = diff.get(a, b);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));  // true 
    });
  });

});