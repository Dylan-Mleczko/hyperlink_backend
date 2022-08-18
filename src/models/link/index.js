import { Schema, model } from 'mongoose';

const linkSchema = new Schema(
  {
    uri: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    click_count: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      data: Buffer,
      contentType: String,
    },
    collection_id: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    last_click: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

export const Link = model('Link', linkSchema);
