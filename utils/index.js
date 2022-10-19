"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function get() {
    return _db.connect;
  }
});
Object.defineProperty(exports, "disconnect", {
  enumerable: true,
  get: function get() {
    return _db.disconnect;
  }
});

var _db = require("./db");