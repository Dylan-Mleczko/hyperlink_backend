/* eslint-disable camelcase */
import Joi from 'joi';
import { Tag } from '../../models';

export const validate = async (tagName) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(63).required(), // tags must be 3 to 31 chars long
    user_id: Joi.string(),
  });

  return schema.validate(tagName);
};

export const create = async ({ name, user_id }) => {
  var tagData = {
    name,
    user_id,
    created_at: Date.now(),
    updated_at: null,
  };

  const tag = await Tag.create(tagData);
  return tag;
};
