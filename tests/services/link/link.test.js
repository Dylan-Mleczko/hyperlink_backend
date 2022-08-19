import '../../utils/db_test_setup_teardown';

import { Link } from '../../../src/models';
import * as linkService from '../../../src/services/link';

describe('LinkService', () => {
  let link = null;
  let linkInfo = {};

  test('Create Link', async () => {
    const linkUri = 'http://test.com';
    const linkName = 'link_name_test';
    const linkCollectionId = '62fe24ad472f625d85d6f659';

    linkInfo = {
      uri: linkUri,
      name: linkName,
      description: '',
      click_count: 0,
      thumbnail: null,
      collection_id: linkCollectionId,
    };

    const linkValidResult = await linkService.validate({
      uri: linkUri,
      name: linkName,
      collection_id: linkCollectionId,
    });

    expect(linkValidResult.error).toBe(undefined);

    link = await linkService.create(linkInfo);
    const linkdb = await Link.findOne({ name: linkInfo.name });

    expect(link).not.toBeNull();
    expect(linkdb).not.toBeNull();
    expect(linkdb.uri).toBe(linkInfo.uri);
    expect(linkdb.name).toBe(linkInfo.name);
    expect(linkdb.collection_id.toString()).toBe(linkInfo.collection_id);
  });
});
