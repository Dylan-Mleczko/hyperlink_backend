/* eslint-disable camelcase */
import Joi from 'joi';
import { Tag } from '../../models';
import { readByName } from './read';

export const validate = async (tagName) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(63).required(), // tags must be 3 to 31 chars long
  });

  return schema.validate(tagName);
};

export const create = async ({ name }) => {
  let tag = await readByName(name);
  if (tag) return tag;

  var tagData = {
    name,
    created_at: Date.now(),
    updated_at: null,
  };

  tag = await Tag.create(tagData);
  return tag;
};
