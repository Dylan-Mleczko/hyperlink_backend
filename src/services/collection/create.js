/* eslint-disable camelcase */
import { Collection } from '../../models';

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
