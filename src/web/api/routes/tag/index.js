import { Router } from 'express';
import { newTagRouterPath, allTagRouterPath } from '../constant';
import { tagController } from '../../controllers';
const router = Router();

router.post(newTagRouterPath, tagController.registerTag);
router.get(allTagRouterPath, tagController.getAllTag);

export { router };
