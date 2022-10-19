"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = void 0;

var _mongoose = require("mongoose");

var tagSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date

  }
});
var Tag = (0, _mongoose.model)('Tag', tagSchema);
exports.Tag = Tag;