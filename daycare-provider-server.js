var restify = require('restify');
var getProviderStream = require('./get-provider-stream');
var level = require('level');
var JSONStream = require('JSONStream');

var headers = {
  'content-type': 'application/json'
};

var dbOpts = {
  valueEncoding: 'json'
};

var db = level(__dirname + '/data/providers.db', dbOpts);

function respond(req, res, next) {
  if (!req.params.ids) {
    next(new restify.BadRequestError('Missing provider ids parameter.'));
    return;
  }

  var opts = {
    base: req.params.name
  };

  res.writeHead(200, headers);

  var stream = getProviderStream({
    db: db,
    ids: req.params.ids.split(',')
  });

  stream.on('error', logError);

  stream
    .pipe(JSONStream.stringify(false))
    .pipe(res);

  function logError(error) {
    console.log(error, error.stack);
  }
}

function respondHead(req, res, next) {
  res.writeHead(200, headers);
  res.end();
  next();
}

function startServer() {
  var server = restify.createServer();
  server.use(restify.CORS());
  server.get('/providers/:ids', respond);
  server.head('/providers/:ids', respondHead);

  server.listen(4999, function reportServerUp() {
    console.log('%s listening at %s', server.name, server.url);
  });

  return server;
}

module.exports = startServer;
