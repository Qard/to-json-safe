var toJSONSafe = require('./')
var tap = require('tap')

function json (o) {
  return JSON.parse(JSON.stringify(o))
}

tap.test('inclusive', function (t) {
  function Test () {
    this.foo = 'bar'
    this.baz = 'buz'
  }

  toJSONSafe(Test.prototype, ['foo'])

  var test = json(new Test)
  t.equal(test.foo, 'bar', 'foo is bar')
  t.equal(typeof test.baz, 'undefined', 'baz is undefined')
  t.end()
})

tap.test('exclusive', function (t) {
  function Test () {
    this.foo = 'bar'
    this.baz = 'buz'
  }

  toJSONSafe(Test.prototype, ['foo'], true)

  var test = json(new Test)
  t.equal(typeof test.foo, 'undefined', 'foo is undefined')
  t.equal(test.baz, 'buz', 'baz is buz')
  t.end()
})
