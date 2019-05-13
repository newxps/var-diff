/**
 * created by flfwzgl
 * github.com/flfwzgl/js-diff
 */

;(function (global, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.diff = factory();
  }
})(typeof window === 'object' ? window : this, function () {
  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;

  var is = function (type) {
    return function (e) {
      return toStr.call(e) === '[object ' + type + ']';
    }
  }

  var isObj = is('Object');
  var isArr = is('Array');

  function apply (data, patches) {
    // if (!(isObj(data) || isArr(data)))
    //   throw new TypeError('data must be an array or object!');

    if (!isArr(patches)) {
      throw new TypeError('patches must be an array');
    }

    patches.forEach(function (e) {
      var t = e.t
        , p = e.p
        , v = e.v
        , i = e.i
        , d = data
        , pp

      if (!p.length) {
        if (t === 3) return data = v;
      }

      for (var j = 0, l = p.length - 1; j < l; j++) {
        pp = p[j];
        d = d[pp];
      }

      pp = p[p.length - 1];

      switch (t) {
        case 1:
        case 3: d[pp] = v;
          break;
        case 4: swap(d, pp, i);
          break;
        case 2:
          typeof pp === 'number'
            ? d.splice(pp, 1)
            : delete d[pp]
          break;
      }
    });
    return data;
  }

  function swap (arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  /**
   * 1-create
   * 2-delete
   * 3-update
   * 4-replace [array]
   */

  var CREATE = 1;
  var DELETE = 2;
  var UPDATE = 3;
  var REPLACE = 4;

  var isJsonType = function (e) {
    switch (typeof e) {
      case 'number':
      case 'string':
      case 'boolean':
        return true;
      default:
        return isObj(e)
          || isArr(e)
          || e === null;
    }
  }

  var isKey = function (id) {
    return typeof id === 'number'
      || typeof id === 'string';
  }

  var format = function (p) {
    return p.reduce(function (prev, e) {
      return typeof e === 'number'
        ? prev + '[' + e + ']'
        : prev && prev + '.' || e
    }, '')
  }

  function get (a, b, key) {
    var patches = [];
    getDiff(a, b, []);
    return patches;

    function getDiff (a, b, p) {
      var k;
      if (isObj(a) && isObj(b)) {
        for (k in a) {
          if (!hasOwn.call(a, k)) continue;
          if (hasOwn.call(b, k)) {
            getDiff(a[k], b[k], p.concat(k));
          } else {
            patches.push({
              t: DELETE,
              p: p.concat(k)
            });
          }
        }
        for (k in b) {
          if (!hasOwn.call(b, k)) continue;
          if (!hasOwn.call(a, k)) {
            patches.push({
              t: CREATE,
              p: p.concat(k),
              v: b[k]
            });
          }
        }
      } else if (isArr(a) && isArr(b)) {
        /**
         * {a, b, c, d, e} -> {c, m, a, e}
         *
         * 先移除要删掉的b, d
         * {a, c, e}
         *
         * 添加m
         * {a, c, e, m}
         *
         * 交换
         * {e, c, a, m}
         * {c, e, a, m}
         */
        
        var amap = Object.create(null)
          , bmap = Object.create(null)
          , id
          , index
          , i
          , l
          , e

        for (i = 0, l = a.length; i < l; i++) {
          e = a[i];
          if (isObj(e)) {
            id = e[key];
            if (isKey(id)) {
              if (id in amap) throw new Error('repetitive key "'+ format(p.concat(i)) + '.' + key +' = ' + id +'" in the origin object');
              amap[id] = i;
            }
          }
        }

        for (i = 0, l = b.length; i < l; i++) {
          e = b[i];
          if (isObj(e)) {
            id = e[key];
            if (isKey(id)) {
              if (id in bmap) throw new Error('repetitive key "'+ format(p.concat(i)) + '.' + key +' = ' + id +'" in the target object');
              bmap[id] = i
            }
          }
        }

        var n = 0, m = 0, tmp = [], tmpMap = {};
        for (i = 0, l = a.length; i < l; i++) {
          e = a[i];
          if (isObj(e) && e[key] in bmap) {
            index = bmap[e[key]];
            if (n !== index && !(index in tmpMap || n in tmpMap)) {
              tmpMap[index] = 1;
              tmp.push({
                t: REPLACE,
                p: p.concat(n),
                i: index
              });
            }
            getDiff(e, b[index], p.concat(n));
            n++;
          } else {
            patches.push({
              t: DELETE,
              p: p.concat(i - m),
            });
            m++;
          }
        }

        for (i = 0, l = b.length; i < l; i++) {
          e = b[i];
          if (!(isObj(e) && e[key] in amap)) {
            patches.push({
              t: CREATE,
              p: p.concat(n),
              v: b[i]
            });

            if (n !== i && !(i in tmpMap || n in tmpMap)) {
              tmp.push({
                t: REPLACE,
                p: p.concat(n),
                i: i
              });
            }
            n++;
          }
        }

        patches.push.apply(patches, tmp);
      } else if (isJsonType(a) || isJsonType(b)) {
        if (a !== b) {
          patches.push({
            t: UPDATE,
            p: p,
            v: b
          });
        }
      }
    }
  }


  return {
    get: get,
    apply: apply
  }

});






