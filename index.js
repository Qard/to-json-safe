var extend = require('extend-object')

module.exports = toJSONSafe

function toJSONSafe (obj, list, isExclusive) {
  var old = obj.toJSON || function () {
    return this
  }

  function include () {
    var base = old.call(this)
    var data = {}

    list.forEach(function (key) {
      var value = base[key]
      if (value) data[key] = value
    })

    return data
  }

  function exclude () {
    var base = old.call(this)
    var data = extend({}, base)

    list.forEach(function (key) {
      delete data[key]
    })

    return data
  }

  obj.toJSON = isExclusive ? exclude : include
}
