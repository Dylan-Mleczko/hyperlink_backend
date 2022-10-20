import { isNilOrEmpty } from 'ramda-adjunct';
import { isMongoId } from 'validator';
import { Link } from '../../models';

export const readById = async (linkId) => {
  if (!isMongoId(`${linkId}`)) {
    console.log(`Invalid linkId ${linkId}`);
    return undefined;
  }
  const link = await Link.findById(linkId);

  if (isNilOrEmpty(link)) {
    console.log(`Cannot find link with id: ${linkId}`);
    return undefined;
  }

  return link;
};

export const readAll = async () => {
  const links = await Link.find();
  return links;
};

export const readAllByCollectionId = async (collectionId) => {
  if (!isMongoId(`${collectionId}`)) {
    console.log(`Invalid collectionID ${collectionId}`);
    return undefined;
  }
  const links = await Link.find({ collection_id: collectionId });

  if (isNilOrEmpty(links)) {
    console.log(`Cannot find link with collection id: ${collectionId}`);
    return undefined;
  }

  return links;
};
