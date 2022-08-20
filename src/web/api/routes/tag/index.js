import { Router } from 'express';
import {
  newTagRouterPath,
  allTagRouterPath,
  getTagRouterPath,
  updateTagRouterPath,
  deleteTagRouterPath,
} from '../constant';
import { tagController } from '../../controllers';
const router = Router();

router.post(newTagRouterPath, tagController.registerTag);
router.get(allTagRouterPath, tagController.getAllTag);
router.get(getTagRouterPath, tagController.getTag);
router.put(updateTagRouterPath, tagController.updateTag);
router.delete(deleteTagRouterPath, tagController.deleteTag);

export { router };
