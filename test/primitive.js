const assert = require('assert');
const diff = require('..');

describe('基本类型', function () {
  describe(`var p = diff.get('1', '1');`, function () {
    it(`p应该是 空数组`, function () {
      var p = diff.get('1', '1');
      assert.equal(JSON.stringify(p), '[]');
    });
  });

  describe(`var p = diff.get('1', 2);`, function () {
    it(`p应该是 [{"t":3,"p":[],"v":2}]`, function () {
      var p = diff.get('1', 2);
      assert.equal(JSON.stringify(p), '[{"t":3,"p":[],"v":2}]');
    });
  });

  describe(`var p = diff.get(1, Infinity);`, function () {
    it(`p应该是 [{"t":3,"p":[],"v":Infinity}]`, function () {
      var p = diff.get(1, Infinity);
      assert.equal(p[0].t, 3);
      assert.equal(p[0].v, Infinity);
    });
  });

  describe(`var p = diff.get(1, NaN);`, function () {
    it(`p应该是 [{"t":3,"p":[],"v":NaN}]`, function () {
      var p = diff.get(1, NaN);
      assert.equal(p[0].t, 3);
      assert.ok(typeof p[0].v === 'number' && isNaN(p[0].v));
    });
  });

  describe(`var p = diff.get(NaN, NaN);`, function () {
    it(`p应该是 []`, function () {
      var p = diff.get(NaN, NaN);
      assert.ok(p.length === 0);
    });
  });

  describe(`var p = diff.get(undefined, void 0);`, function () {
    it(`p应该是 []`, function () {
      var p = diff.get(undefined, void 0);
      assert.ok(p.length === 0);
    });
  });

  describe(`var p = diff.get(1000, 1e3);`, function () {
    it(`p应该是 []`, function () {
      var p = diff.get(1000, 1e3);
      assert.ok(p.length === 0);
    });
  });

  describe(`var p = diff.get(true, false);`, function () {
    it(`p应该是 [{"t":3,"p":[],"v":false}]`, function () {
      var p = diff.get(true, false);
      assert.equal(JSON.stringify(p), '[{"t":3,"p":[],"v":false}]');
    });
  });
});




















