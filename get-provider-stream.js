var Readable = require('stream').Readable;

function getProviderStream(opts) {
  var ids;
  var db;

  if (opts) {
    ids = opts.ids.slice();
    db = opts.db;
  }

  var stream = new Readable({
    objectMode: true
  });

  stream._read = function read() {
    if (ids.length > 0) {
      db.get(ids.shift(), pushProvider);
    }
    else {
      this.push(null);
    }
  };

  return stream;

  function pushProvider(error, provider) {
    if (error) {
      stream.emit('error', error);
    }
    else {
      stream.push(provider);
    }
  }
}

module.exports = getProviderStream;
