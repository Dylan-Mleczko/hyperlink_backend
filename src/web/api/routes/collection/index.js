import { Router } from 'express';
import {
  newCollectionRouterPath,
  allCollectionRouterPath,
  getCollectionRouterPath,
  updateCollectionRouterPath,
  deleteCollectionRouterPath,
} from '../constant';
import { collectionController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newCollectionRouterPath, [passportAuth], collectionController.registerCollection);
router.get(allCollectionRouterPath, [passportAuth], collectionController.getAllCollection);
router.get(getCollectionRouterPath, [passportAuth], collectionController.getCollection);
router.put(updateCollectionRouterPath, [passportAuth], collectionController.updateCollection);
router.delete(deleteCollectionRouterPath, [passportAuth], collectionController.deleteCollection);

export { router };
