/* eslint-disable camelcase */
import Joi from 'joi';
import { Collection } from '../../models';
import { create as createTag } from '../tag';

export const validate = async (collectionInfo) => {
  const schema = Joi.object({
    name: Joi.string().min(0).max(127).required(),
    description: Joi.string().min(0).max(4095),
    user_id: Joi.string(),
  });
  // const collectionDetailError = collectionDetailSchema.validate(collectionDetails).error;
  // const errorMsg = collectionDetailError.details[0].message;
  // console.log();

  return schema.validate(collectionInfo);
};

export const create = async ({
  name,
  description,
  user_id,
  tags = null,
  image = null,
  image_type = null,
}) => {
  var imgData = image ? { type: 'Buffer', data: image } : null;

  var collectionData = {
    name,
    description,
    tags: null,
    image: imgData,
    image_type,
    click_count: 0,
    favourite: false,
    user_id,
    created_at: Date.now(),
    updated_at: null,
  };

  console.log('collection.create: ', collectionData);

  let collection;
  collection = await Collection.create(collectionData);

  collection = await Collection.findById(collection._id);

  if (!tags) return collection;

  let v_tags_name = [];
  let v_tags = [];
  let separator = /,|:|;| /;
  const temp_tags = tags
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => item !== '');
  v_tags_name = [...new Set(temp_tags)];
  console.log('v_tags_name:', v_tags_name);
  for (let i = 0; i < v_tags_name.length; i++) {
    const tag = await createTag({ name: v_tags_name[i] });
    v_tags.push(tag._id.toString());
  }

  if (v_tags.length == 0) return collection;

  collection.tags = v_tags;
  await collection.save();

  collection = await Collection.findById(collection._id);

  return collection;
};
