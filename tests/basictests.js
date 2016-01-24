var test = require('tape');
var getProviderStream = require('../get-provider-stream');
var level = require('level');

var dbOpts = {
  valueEncoding: 'json'
};

var db = level(__dirname + '/../data/providers.db', dbOpts);

var testCases = [
  {
    opts: {
      db: db,
      ids: [
        '2425',
        '11867',
        '30001',
        '53382',
        '64238'
      ]
    }
  },
  {
    opts: {
      db: db,
      ids: [
        '5297',
        '7863',
        '52190'
      ]
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    var stream = getProviderStream(testCase.opts);
    stream.on('error', reportError);
    stream.on('data', checkResult);
    stream.on('end', checkEnd);

    var idsOfProvidersRead = [];

    function reportError(error) {
      t.fail('No error while getting providers.');
      console.log(error);
    }

    function checkResult(provider) {
      idsOfProvidersRead.push(provider.providerid);

      t.ok(
        testCase.opts.ids.indexOf(provider.providerid) !== -1,
        'Expected provider id found.'
      );
      t.ok(provider['Program Name'], 'Provider has Program Name.');
      t.ok(provider['Capacity'], 'Provider has Capacity.');
      t.ok(provider['Type of care'], 'Provider has Type of care.');
      t.ok(provider['Telephone'], 'Provider has Telephone.');
      t.ok(provider['Address'], 'Provider has Address.');
      t.ok(provider['ZipCode'], 'Provider has ZipCode.');
    }

    function checkEnd() {
      t.pass('Stream ended');
      // console.log('idsOfProvidersRead', idsOfProvidersRead);
      t.equal(
        idsOfProvidersRead.length,
        testCase.opts.ids.length,
        'Expected number of providers read.'
      );
      testCase.opts.ids.forEach(checkProviderWasRead);

      t.end();
    }

    function checkProviderWasRead(id) {
      t.ok(idsOfProvidersRead.indexOf(id) !== -1, id + ' was read.');
    }
  });
}
