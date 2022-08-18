/* eslint-disable camelcase */
import Joi from 'joi';
import { Link } from '../../models';

export const validate = async (linkInfo) => {
  const schema = Joi.object({
    uri: Joi.string().min(5).max(255).required().uri(),
    name: Joi.string().min(3).max(31).required(),
  });

  return schema.validate(linkInfo);
};

export const create = async ({ uri, name, collection_id, description = '', thumbnail = null }) => {
  var linkData = {
    uri,
    name,
    description,
    click_count: 0,
    thumbnail,
    collection_id,
    created_at: Date.now(),
    updated_at: null,
  };

  const link = await Link.create(linkData);
  return link;
};
