"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnect = exports.connect = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _config = _interopRequireDefault(require("config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var connect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (connectDbUri) {
    var connOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var dbUri = connectDbUri || _config.default.db.uri;
    var options = {
      autoIndex: false,
      // Don't build indexes
      maxPoolSize: 25,
      // Maintain up to 25 socket connections
      minPoolSize: 5,
      // The minimum number of sockets will keep open for this connection
      serverSelectionTimeoutMS: 5000,
      // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000,
      // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6

    };
    var conn = _mongoose.default.connection;

    var connOpts = _ramda.default.mergeAll(options, connOptions); // Connection Events


    conn.on('connecting', () => {
      console.log('Database is connecting ...');
    });
    conn.on('connected', () => {
      console.log("Database connected to ".concat(conn.host, ":").concat(conn.port, "/").concat(conn.name)); // console.log(`${config.db.name} connected to ${conn.host}:${conn.port}/${conn.name}`);
    });
    conn.on('disconnecting', () => {
      console.log('Database is disconnecting ...');
    });
    conn.on('disconnected', () => {
      console.log('Database disconnected');
    });
    conn.on('close', () => {
      console.log('Database connection closed');
    });
    conn.on('reconnected', () => {
      console.log("Database reconnected to ".concat(conn.host, ":").concat(conn.port, "/").concat(conn.name));
    });
    conn.on('reconnectFailed', () => {
      console.log('Database reconnect Failed ');
    });
    conn.on('error', () => {
      console.log('Database connect error');
    });
    yield _mongoose.default.connect(dbUri, connOpts);
    return conn;
  });

  return function connect(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.connect = connect;

var disconnect = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (conn) {
    if (conn) yield conn.close();else yield _mongoose.default.connection.close();
    console.log('Database disconnected');
  });

  return function disconnect(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // export { disconnect, connect };


exports.disconnect = disconnect;