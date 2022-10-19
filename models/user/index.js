"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = require("mongoose");

var _nanoid = require("nanoid");

var userSchema = new _mongoose.Schema({
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  jti: {
    type: String,
    default: () => (0, _nanoid.nanoid)(16),
    index: true
  },
  sign_in_count: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date

  }
});
var User = (0, _mongoose.model)('User', userSchema);
exports.User = User;