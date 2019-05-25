const assert = require('assert');
const diff = require('..');

describe('对象类型', function () {
  describe(`
    var a = {
      name: 'tom',
      age: 30
    }
    var b = {
      name: 'tom',
      age: 20,
      gender: 'male'
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = {
        name: 'tom',
        age: 30
      }
      var b = {
        name: 'tom',
        age: 20,
        gender: 'male'
      }
      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });


  describe(`
    var a = {
      name: 'jack',
      age: 20
    }

    var b = {
      name: 'tom',
      age: 25
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = {
        name: 'jack',
        age: 20
      }

      var b = {
        name: 'tom',
        age: 25
      }
      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });

  describe(`
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
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
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
      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });


  describe(`
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
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
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
      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });



  describe(`
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
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
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

      var p = diff.get(a, b, 'id');
      p = diff.get(a, b);
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });



  describe(`
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
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
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

      var p = diff.get(a, b, 'id');
      p = diff.get(a, b);
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });




  describe(`
    var a = {
      name: 'tom',
      age: 30
    }
    var b = {
      name: 'tom',
      age: 20,
      gender: 'male'
    }`, function () {
    it(`diff.apply(a, p) 应该全等于 b`, function () {
      var a = {
        name: 'tom',
        age: 30
      }
      var b = {
        name: 'tom',
        age: 20,
        gender: 'male'
      }
      var p = diff.get(a, b);
      p = diff.get(a, b, 'id');
      console.log(p);
      var aa = diff.apply(a, p);
      assert.equal(JSON.stringify(aa), JSON.stringify(b));
    });
  });


});
