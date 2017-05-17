
var range = require('./range')
var Skip = require('./skip')
var createCursor = require('./cursor')
var Take = require('pull-stream/throughs/take')

function Test(opts) {
  if(opts.end)
    return function (seq) { return opts.reverse ? seq > end : seq < end }
  if(opts.end != null && opts.endInclusive) {
    var once = true
    return function (seq) {
      if(once)
        return false
      if(!(opts.reverse ? seq > end : seq < end))
        return once = true
      else
        return true
    }
  }

}

module.exports = function (since, getMeta) {
  var Cursor = createCursor(since, getMeta)
  return function (opts) {
    opts = range(opts)

    var stream = Cursor(
      opts.old === false ? null : opts.start,
      opts.live || (opts.old === false),
      opts.reverse,
      opts.seqs,
      Test(opts)
    )

    if(!opts.startInclusive || opts.old === false)
      stream = Skip(1)(stream)
    if(opts.limit)
      stream = Take(opts.limit)(stream)
    return stream
  }
}










