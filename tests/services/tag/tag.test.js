import '../../utils/db_test_setup_teardown';

import { Tag } from '../../../src/models';
import * as tagService from '../../../src/services/tag';

describe('tagService', () => {
  let tag = null;
  let tagInfo = {};

  test('Create Tag', async () => {
    const tagName = 'tag_name_test';

    tagInfo = {
      name: tagName,
    };

    const tagValidResult = await tagService.validate({
      name: tagName,
    });

    expect(tagValidResult.error).toBe(undefined);

    tag = await tagService.create(tagInfo);
    const tagdb = await Tag.findOne({ name: tagInfo.name });

    expect(tag).not.toBeNull();
    expect(tagdb).not.toBeNull();
    expect(tagdb.name).toBe(tagInfo.name);
  });
});
