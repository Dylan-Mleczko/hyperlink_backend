import { isNilOrEmpty } from 'ramda-adjunct';
import { isMongoId } from 'validator';
import { Collection } from '../../models';
import * as tagService from '../tag';

async function resolveTags(tags) {
  var resolvedTags = [];
  for (const tag of tags) {
    await tagService
      .readById(tag)
      .then((response) => {
        resolvedTags = [...resolvedTags, response];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return resolvedTags;
}

export const readById = async (collectionId) => {
  if (!isMongoId(`${collectionId}`)) {
    console.log(`Invalid collectionId ${collectionId}`);
    return undefined;
  }
  const collection = await Collection.findById(collectionId);

  if (isNilOrEmpty(collection)) {
    console.log(`Cannot find collection with id: ${collectionId}`);
  }

  const collectionWithTag = collection;
  collectionWithTag.tags = await resolveTags(collection.tags);

  return collectionWithTag;
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

  var collectionsWithTags = [];

  for (const collection of collections) {
    const collectionWithTag = collection;
    collectionWithTag.tags = await resolveTags(collection.tags);
    collectionsWithTags = [...collectionsWithTags, collectionWithTag];
  }

  return collectionsWithTags;
};
