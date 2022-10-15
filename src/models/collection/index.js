import { Schema, model } from 'mongoose';

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],

    image: {
      type: Object,
    },
    image_type: {
      type: String,
    },
    click_count: {
      type: Number,
    },
    favourite: {
      type: Boolean,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

export const Collection = model('Collection', collectionSchema);
