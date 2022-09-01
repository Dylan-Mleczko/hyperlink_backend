import { Router } from 'express';
import {
  newTagRouterPath,
  allTagRouterPath,
  getTagRouterPath,
  updateTagRouterPath,
  deleteTagRouterPath,
} from '../constant';
import { tagController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newTagRouterPath, [passportAuth], tagController.registerTag);
router.get(allTagRouterPath, [passportAuth], tagController.getAllTag);
router.get(getTagRouterPath, [passportAuth], tagController.getTag);
router.put(updateTagRouterPath, [passportAuth], tagController.updateTag);
router.delete(deleteTagRouterPath, [passportAuth], tagController.deleteTag);

export { router };
