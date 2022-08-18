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
  }

  return link;
};

export const readAll = async () => {
  const links = await Link.find();
  return links;
};
