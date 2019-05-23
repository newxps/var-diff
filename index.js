/**
 * created by flfwzgl
 * github.com/flfwzgl/var-diff
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

  var rtype = /\[object (\w+)\]/;
  var getType = function (e) {
    var arr = toStr.call(e).match(rtype);
    return (arr && arr[1] || '').toLowerCase();
  }

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

  var isnan = function (e) {
    return typeof e === 'number' && isNaN(e);
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
      if (a === b || isnan(a) && isnan(b)) return;
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
         * [a, b, {c}, d, b, {e}, f, g, h]
         * [{c}, b, m, a, {e}, b, a] 
         *
         * 先移除要删掉的 d, f, g, h
         * [a, b, {c}, b, {e}]
         *
         * 添加 m, a
         * [a, b, {c}, b, {e}, m, a]
         *
         * 交换
         * [{c}, b, a, b, {e}, m, a]
         * [{c}, b, b, m, {e}, m, a]
         * 
         * [{c}, b, , m, {e}, b, a]
         */
        
        // numMap = {
        //   53: [5, 15]
        // }

        var amap = {}
          , bmap = {}
          , numMap = {}
          , strMap = {}
          , trues = []
          , falses = []
          , nulls = []
          , undefs = []
          , la = a.length
          , lb = b.length
          , exists
          , id
          , index
          , i
          , l
          , e
        
        var n = 0
          , m = 0
          , replacePatches = []
          , indexMap = {}

        for (i = 0, l = Math.max(la, lb); i < l; i++) {
          if (i < la) {
            e = a[i];
            if (getType(e) === 'object') {
              id = e[key];
              if (isKey(id)) {
                if (id in amap) throw new Error('repetitive key "'+ format(p.concat(i)) + '.' + key +' = ' + id +'" in the origin object');
                amap[id] = i;
              }
            }
          }

          if (i < lb) {
            e = b[i];
            switch (getType(e)) {
              case 'object':
                id = e[key];
                if (isKey(id)) {
                  if (id in bmap) throw new Error('repetitive key "'+ format(p.concat(i)) + '.' + key +' = ' + id +'" in the target object');
                  bmap[id] = i;
                }
                break;
              case 'number':
                e in numMap
                  ? numMap[e].push(i)
                  : numMap[e] = [i]
                break;
              case 'string':
                e in strMap
                  ? strMap[e].push(i)
                  : strMap[e] = [i]
                break;
              case 'boolean':
                e ? trues.push(i) : falses.push(i);
                break;
              case 'null':
                nulls.push(i);
                break;
              case 'undefined':
                undefs.push(i);
                break;
            }
          }
        }

        for (i = 0; i < la; i++) {
          e = a[i];

          exists = false;
          switch (getType(e)) {
            case 'object':
              if (e[key] in bmap) {
                exists = true;
                index = bmap[e[key]];
              }
              break;
            case 'number':
              if (e in numMap && numMap[e].length) {
                exists = true;
                index = numMap[e].shift();
              }
              break;
            case 'string':
              if (e in strMap && strMap[e].length) {
                exists = true;
                index = strMap[e].shift();
              }
              break;
            case 'boolean':
              if (e && trues.length || !e && falses.length) {
                exists = true;
                index = e ? trues.shift() : falses.shift();
              }
              break;
            case 'null':
              if (nulls.length) {
                exists = true;
                index = nulls.shift();
              }
              break;
            case 'undefined':
              if (undefs.length) {
                exists = true;
                index = undefs.shift();
              }
              break;
          }

          if (exists) {
            if (n !== index && !(index in indexMap || n in indexMap)) {
              indexMap[index] = true;
              replacePatches.push({
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

        for (i = 0; i < lb; i++) {
          e = b[i];
          exists = false;
          switch (getType(e)) {
            case 'object':
              exists = e[key] in amap;
              break;
            case 'number':
              exists = !numMap[e].length;
              break;
            case 'string':
              exists = !strMap[e].length;
              break;
            case 'boolean':
              exists = e ? !trues.ength : !falses.length;
              break;
            case 'null':
              exists = !nulls.length;
              break;
            case 'undefined':
              exists = !undefs.length;
              break;
          }

          if (!exists) {
            patches.push({
              t: CREATE,
              p: p.concat(n),
              v: b[i]
            });

            if (n !== i && !(i in indexMap || n in indexMap)) {
              replacePatches.push({
                t: REPLACE,
                p: p.concat(n),
                i: i
              });
            }
            n++;
          }
        }
        patches.push.apply(patches, replacePatches);
      } else {
        patches.push({
          t: UPDATE,
          p: p,
          v: b
        });
      }
    }
  }


  return {
    get: get,
    apply: apply
  }

});
