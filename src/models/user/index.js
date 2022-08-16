import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    jti: {
      type: String,
      default: () => nanoid(16),
      index: true,
    },
    sign_in_count: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

export const User = model('User', userSchema);
