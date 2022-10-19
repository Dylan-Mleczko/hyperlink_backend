"use strict";

var _config = _interopRequireDefault(require("config"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = require("./web/middleware/passport");

var _db = require("./utils/db");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _routes = require("./web/api/routes");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var PORT = 3050;
var app = (0, _express.default)();
var corsOptions = {
  origin: true,
  //included origin as true
  credentials: true //included credentials as true

};
app.use((0, _cors.default)(corsOptions)); // Enable All CORS Requests

app.use(_express.default.json({
  limit: '5mb'
})); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: false
})); // for parsing application/x-www-form-urlencoded

app.use((0, _cookieParser.default)());
app.use((0, _expressFileupload.default)()); // use passport for authentication

console.log('Passport initialize');
app.use(_passport.default.initialize()); // passport init

console.log('Middleware passport enable');
(0, _passport2.middlewarePassport)(_passport.default);
app.use((req, res, next) => {
  req.passport = _passport.default;

  if (req.method === 'OPTIONS') {
    res.send(200);
  }

  next();
}); // set headers

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // use all api routes

_routes.routes.forEach(route => {
  app.use(route.router);
});

console.log(_config.default.db.uri);

var startServer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    yield (0, _db.connect)(_config.default.db.uri); // const port = config.get('server.port');

    app.listen(PORT, () => {
      console.log('Server is listening on port: ' + PORT);
    });
  });

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer(); // connect(config.db.uri).then(() => {
//   app.listen(PORT, () => {
//     console.log('Server is listening on port: ' + PORT);
//   });
// });