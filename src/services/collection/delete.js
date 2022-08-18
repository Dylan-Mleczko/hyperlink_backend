import { Collection } from '../../models';

export const deleteById = async ({ collectionId }) => {
  const deletedCollection = await Collection.findByIdAndDelete(collectionId);
  console.log(
    `Deleted collection by Id: ${collectionId}, Collection: ${JSON.stringify(deletedCollection)}`
  );
  return deletedCollection;
};
