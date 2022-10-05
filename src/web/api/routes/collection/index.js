import { Router } from 'express';
import {
  newCollectionRouterPath,
  allUserCollectionsRouterPath,
  getCollectionRouterPath,
  updateCollectionRouterPath,
  deleteCollectionRouterPath,
  addTagToCollectionRouterPath,
} from '../constant';
import { collectionController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newCollectionRouterPath, [passportAuth], collectionController.addCollection);
router.get(allUserCollectionsRouterPath, [passportAuth], collectionController.getUserCollections);
router.get(getCollectionRouterPath, [passportAuth], collectionController.getCollection);
router.put(addTagToCollectionRouterPath, [passportAuth], collectionController.addTagToCollection);
router.put(updateCollectionRouterPath, [passportAuth], collectionController.updateCollection);
router.delete(deleteCollectionRouterPath, [passportAuth], collectionController.deleteCollection);

export { router };
