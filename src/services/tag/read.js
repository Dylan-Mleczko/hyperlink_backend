import { isNilOrEmpty } from 'ramda-adjunct';
import { isMongoId } from 'validator';
import { Tag } from '../../models';

export const readById = async (tagId) => {
  if (!isMongoId(`${tagId}`)) {
    console.log(`Invalid tagId ${tagId}`);
    return undefined;
  }
  const tag = await Tag.findById(tagId);

  if (isNilOrEmpty(tag)) {
    console.log(`Cannot find tag with id: ${tagId}`);
  }

  return tag;
};
