import { Router } from 'express';
import {
  newTagRouterPath,
  allUserTagRouterPath,
  getTagRouterPath,
  updateTagRouterPath,
  deleteTagRouterPath,
} from '../constant';
import { tagController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newTagRouterPath, [passportAuth], tagController.addTag);
router.get(allUserTagRouterPath, [passportAuth], tagController.getUserTags);
router.get(getTagRouterPath, [passportAuth], tagController.getTag);
router.put(updateTagRouterPath, [passportAuth], tagController.updateTag);
router.delete(deleteTagRouterPath, [passportAuth], tagController.deleteTag);

export { router };
