import '../../utils/db_test_setup_teardown';

import { Collection } from '../../../src/models';
import * as collectionService from '../../../src/services/collection';

describe('CollectionService', () => {
  let collection = null;
  let collectionInfo = {};

  test('Create Collection', async () => {
    const collectionName = 'collection_name_test';
    const collectionDesc = 'collection_description_test';
    const collectionUserId = '62fe1ae7377c4184805fd4a3';

    collectionInfo = {
      name: collectionName,
      description: collectionDesc,
      // TODO: replace tags and images with actual tests
      tags: null,
      image: null,
      click_count: 0,
      favourite: false,
      user_id: collectionUserId,
    };

    const collectionValidResult = await collectionService.validate({
      name: collectionName,
      description: collectionDesc,
      user_id: collectionUserId,
    });

    expect(collectionValidResult.error).toBe(undefined);

    collection = await collectionService.create(collectionInfo);
    const collectiondb = await Collection.findOne({ name: collectionInfo.name });

    expect(collection).not.toBeNull();
    expect(collectiondb).not.toBeNull();
    expect(collectiondb.name).toBe(collectionInfo.name);
    expect(collectiondb.description).toBe(collectionInfo.description);
    // expect(collectiondb.tags).toBeNull();
    // expect(collectiondb.image).toBeNull();
    expect(collectiondb.click_count).toBe(collectionInfo.click_count);
    expect(collectiondb.favourite).toBe(collectionInfo.favourite);
    expect(collectiondb.user_id.toString()).toBe(collectionInfo.user_id);
  });
});
