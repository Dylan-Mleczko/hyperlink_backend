import { Router } from 'express';
import {
  newCollectionRouterPath,
  allCollectionRouterPath,
  getCollectionRouterPath,
  updateCollectionRouterPath,
  deleteCollectionRouterPath,
} from '../constant';
import { collectionController } from '../../controllers';
const router = Router();

router.post(newCollectionRouterPath, collectionController.registerCollection);
router.get(allCollectionRouterPath, collectionController.getAllCollection);
router.get(getCollectionRouterPath, collectionController.getCollection);
router.put(updateCollectionRouterPath, collectionController.updateCollection);
router.delete(deleteCollectionRouterPath, collectionController.deleteCollection);

export { router };
