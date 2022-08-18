import { Link } from '../../models';

export const deleteById = async ({ linkId }) => {
  const deletedLink = await Link.findByIdAndDelete(linkId);
  console.log(`Deleted link by Id: ${linkId}, Link: ${JSON.stringify(deletedLink)}`);
  return deletedLink;
};
