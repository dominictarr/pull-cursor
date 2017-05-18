var ltgt = require('ltgt')

module.exports = function (opts) {
  return {
    start: (
      opts.reverse ?
      ltgt.upperBound(opts, null) :
      ltgt.lowerBound(opts, 0)
    ),
    end: (
      opts.reverse ?
      ltgt.lowerBound(opts, 0) :
      ltgt.upperBound(opts, null)
    ),
    startInclusive: ltgt.startInclusive(opts),
    endInclusive: ltgt.endInclusive(opts),
    reverse: !!opts.reverse,
    live: opts.live,
    old: opts.old,
    limit: opts.limit,
    seqs: opts.seqs, values: opts.values
  }
}

