import { isNilOrEmpty } from 'ramda-adjunct';
import { isMongoId } from 'validator';
import { Collection } from '../../models';

export const readById = async (collectionId) => {
  if (!isMongoId(`${collectionId}`)) {
    console.log(`Invalid collectionId ${collectionId}`);
    return undefined;
  }
  const collection = await Collection.findById(collectionId);

  if (isNilOrEmpty(collection)) {
    console.log(`Cannot find collection with id: ${collectionId}`);
  }

  return collection;
};

export const readAllByUserId = async (userId) => {
  if (!isMongoId(`${userId}`)) {
    console.log(`Invalid userId ${userId}`);
    return undefined;
  }
  const collections = await Collection.find({ user_id: userId });

  if (isNilOrEmpty(collections)) {
    console.log(`Cannot find collection with user id: ${userId}`);
  }

  return collections;
};
