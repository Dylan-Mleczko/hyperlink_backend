/* eslint-disable complexity */
import { isNilOrEmpty } from 'ramda-adjunct';
import { Collection } from '../../models';
import { create as createTag } from '../tag';

export const update = async (collectionId, props) => {
  const collection = await Collection.findById(collectionId);
  if (isNilOrEmpty(collection)) {
    console.log(`Cannot find collection with id: ${collectionId}`);
    return undefined;
  }

  if (props.name) {
    collection.name = props.name;
  }

  if (props.description) {
    collection.description = props.description;
  }

  if (props.tags) {
    await updateTags(collection, props.tags);
    // collection.tags = props.tags;
  }

  if (props.image) {
    var imgData = { type: 'Buffer', data: props.image };
    collection.image = imgData;
  }

  if (props.image_type) {
    collection.image_type = props.image_type;
  }

  if (props['favourite'] !== undefined) {
    collection.favourite = props.favourite;
  }

  if (props.click_count) {
    collection.click_count = props.click_count;
  }

  await collection.save();

  const updatedCollection = await Collection.findById(collectionId);
  console.log(updatedCollection);

  return updatedCollection;
};

const updateTags = async (collection, newTags) => {
  if (newTags == collection.tags) return;
  if (newTags == []) {
    collection.tags = [];
    return;
  }

  let v_tags_name = [];
  let v_tags = [];
  let separator = /,|:|;| /;
  const temp_tags = newTags
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
  return;
};
