/* eslint-disable complexity */
import { isNilOrEmpty } from 'ramda-adjunct';
import { Tag } from '../../models';

export const update = async (tagId, props) => {
  const tag = await Tag.findById(tagId);
  if (isNilOrEmpty(tag)) {
    console.log(`Cannot find tag with id: ${tagId}`);
    return undefined;
  }

  if (props.name) {
    tag.name = props.name;
  }

  await tag.save();

  const updatedTag = await Tag.findById(tagId);

  return updatedTag;
};
