import { Router } from 'express';
import {
  newUserRouterPath,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
  loginRouterPath,
} from '../constant';

import { userController } from '../../controllers';
const router = Router();

router.post(newUserRouterPath, userController.registerUser);
router.get(allUserRouterPath, userController.getAllUser);
router.get(getUserRouterPath, userController.getUser);
router.put(updateUserRouterPath, userController.updateUser);
router.delete(deleteUserRouterPath, userController.deleteUser);
router.post(loginRouterPath, userController.loginUser);


export { router };
