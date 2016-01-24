var test = require('tape');
var startServer = require('../daycare-provider-server');
var request = require('request');

var testCases = [
  {
    opts: {
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
  test('Integration test', function integrationTest(t) {
    var server = startServer();

    var requestOpts = {
      method: 'GET',
      url: 'http://localhost:4999/providers/' + testCase.opts.ids.join(','),
      json: true
    };

    request(requestOpts)
      .on('error', reportError)
      .on('data', checkResult)
      .on('end', checkEnd);

    var idsOfProvidersRead = [];

    function reportError(error) {
      t.fail('No error while getting providers.');
      console.log(error);
    }

    function checkResult(chunk) {
      var provider = JSON.parse(chunk);
      // console.log(provider);
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
      server.close();
      t.end();
    }

    function checkProviderWasRead(id) {
      t.ok(idsOfProvidersRead.indexOf(id) !== -1, id + ' was read.');
    }
  });
}
