"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = void 0;

var _mongoose = require("mongoose");

var collectionSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  image: {
    type: Object
  },
  image_type: {
    type: String
  },
  click_count: {
    type: Number
  },
  favourite: {
    type: Boolean
  },
  user_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date

  }
});
var Collection = (0, _mongoose.model)('Collection', collectionSchema);
exports.Collection = Collection;