import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  link: {
    type: String,
  },
});

export const Item = model('Item', itemSchema);
