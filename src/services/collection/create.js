/* eslint-disable camelcase */
import Joi from 'joi';
import { Collection } from '../../models';

export const validate = async (collectionInfo) => {
  const schema = Joi.object({
    name: Joi.string().min(0).max(127).required(),
    description: Joi.string().min(0).max(4095),
    user_id: Joi.string(),
  });

  return schema.validate(collectionInfo);
};

export const create = async ({ name, description, user_id, tags = [], image = null }) => {
  var collectionData = {
    name,
    description,
    tags,
    image,
    click_count: 0,
    favourite: false,
    user_id,
    created_at: Date.now(),
    updated_at: null,
  };

  const collection = await Collection.create(collectionData);
  return collection;
};
