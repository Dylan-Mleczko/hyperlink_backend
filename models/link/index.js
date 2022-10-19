"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;

var _mongoose = require("mongoose");

var linkSchema = new _mongoose.Schema({
  uri: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  click_count: {
    type: Number,
    default: 0
  },
  thumbnail: {
    data: Buffer,
    contentType: String
  },
  collection_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  last_click: {
    type: Date
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date

  }
});
var Link = (0, _mongoose.model)('Link', linkSchema);
exports.Link = Link;