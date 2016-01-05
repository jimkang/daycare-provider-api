var level = require('level');
var ldj = require('ldjson-stream');
var fs = require('fs');
var levelws = require('level-ws');
var through = require('through2');

if (process.argv.length < 4) {
  process.stderr.write('Usage: node build-db.js <line-separated provider data JSON file> <output db location>\n');
  process.exit();
}

var providerDataLocation = process.argv[2];
var dbLocation = process.argv[3];

var dbOpts = {
  encoding: 'json'
};

var db = levelws(level(dbLocation, dbOpts));

function organizeIntoKeyAndValue(d, encoding, done) {
  this.push({
    key: d.providerid,
    value: d
  });
  done();
}

((((((((((((((((function streamProvidersToDb() {
  var streamOpts = {
    objectMode: true
  };

  var keyValueStream = through(streamOpts, organizeIntoKeyAndValue);
  var ws = db.createWriteStream(dbOpts);

  fs.createReadStream(providerDataLocation)
    .pipe(ldj.parse())
    .pipe(keyValueStream)
    .pipe(ws);

})())))))))))))))));
