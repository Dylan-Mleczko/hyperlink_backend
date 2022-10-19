"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewareValidate = void 0;

var middlewareValidate = validator => (req, res, next) => {
  var {
    error
  } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
};

exports.middlewareValidate = middlewareValidate;