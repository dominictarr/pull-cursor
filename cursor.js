
module.exports = function (since, getMeta) {
  return function (cursor, live, reverse, meta, test) {

    function get (offset, cb) {
      since.once(function (_offset) {
        if(offset == null)
          offset = _offset

        if(offset < 0)
          cb(true)
        else if(offset <= _offset)
          next()
        else if(live)
          since.once(next, false)
        else
          cb(true) //end of the stream
      })

      function next () {
        getMeta(offset, cb)
      }
    }

    return function (abort, cb) {
      if(abort) return cb(abort)
      var _cursor = cursor

      if(test && !test(_cursor))
        return cb(true)
      get(_cursor, function (err, value, prev, next) {
        //this should also handle ended state.
        if(err) return cb(err)
        cursor = reverse ? prev : next

        if(meta)
          cb(null, {seq: _cursor, value: value})
        else
          cb(null, value)
      })
    }
  }
}

