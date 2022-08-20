import { Router } from 'express';
import {
  newUserRouterPath,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
} from '../constant';
import { userController } from '../../controllers';
const router = Router();

router.post(newUserRouterPath, userController.registerUser);
router.get(allUserRouterPath, userController.getAllUser);
router.get(getUserRouterPath, userController.getUser);
router.put(updateUserRouterPath, userController.updateUser);
router.delete(deleteUserRouterPath, userController.deleteUser);

export { router };
