/* eslint-disable complexity */
import { isNilOrEmpty } from 'ramda-adjunct';
import { Collection } from '../../models';

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
    collection.tags = props.tags;
  }

  if (props.image) {
    collection.image = props.image;
  }

  if (props.favourite) {
    collection.favourite = props.favourite;
  }

  await collection.save();

  const updatedCollection = await Collection.findById(collectionId);

  return updatedCollection;
};
