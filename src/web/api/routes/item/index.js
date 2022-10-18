import { Router } from 'express';
import {
  newItemRouterPath,
  allItemRouterPath,
  getItemRouterPath,
  updateItemRouterPath,
  deleteItemRouterPath,
} from '../constant';
import { itemController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newItemRouterPath, [passportAuth], itemController.addItem);
router.get(allItemRouterPath, [passportAuth], itemController.getAllItems);
router.get(getItemRouterPath, [passportAuth], itemController.getItem);
router.put(updateItemRouterPath, [passportAuth], itemController.updateItem);
router.delete(deleteItemRouterPath, [passportAuth], itemController.deleteItem);

export { router };
