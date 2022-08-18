/* eslint-disable complexity */
import { isNilOrEmpty } from 'ramda-adjunct';
import { Link } from '../../models';

export const update = async (linkId, props) => {
  const link = await Link.findById(linkId);
  if (isNilOrEmpty(link)) {
    console.log(`Cannot find link with id: ${linkId}`);
    return undefined;
  }

  if (props.uri) {
    link.uri = props.uri;
  }

  if (props.name) {
    link.name = props.name;
  }

  if (props.description) {
    link.description = props.description;
  }

  if (props.thumbnail) {
    link.thumbnail = props.thumbnail;
  }

  await link.save();

  const updatedLink = await Link.findById(linkId);

  return updatedLink;
};
