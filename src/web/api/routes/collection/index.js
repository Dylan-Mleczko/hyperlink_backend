import { Router } from 'express';
import { newCollectionRouterPath, allCollectionRouterPath } from '../constant';
import { collectionController } from '../../controllers';
const router = Router();

router.post(newCollectionRouterPath, collectionController.registerCollection);
router.get(allCollectionRouterPath, collectionController.getAllCollection);

export { router };
