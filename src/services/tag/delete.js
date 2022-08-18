import { Tag } from '../../models';

export const deleteById = async ({ tagId }) => {
  const deletedTag = await Tag.findByIdAndDelete(tagId);
  console.log(`Deleted tag by Id: ${tagId}, Tag: ${JSON.stringify(deletedTag)}`);
  return deletedTag;
};
