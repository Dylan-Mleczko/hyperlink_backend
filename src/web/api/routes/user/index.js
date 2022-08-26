import { Router } from 'express';
import {
  registerRouterPath,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
  loginRouterPath,
  logoutRouterPath,
} from '../constant';

import { userController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(registerRouterPath, userController.registerUser);
router.post(loginRouterPath, userController.login);
router.post(logoutRouterPath, [passportAuth], userController.logout);
router.get(allUserRouterPath, [passportAuth], userController.getAllUser);
router.get(getUserRouterPath, [passportAuth], userController.getUser);
router.put(updateUserRouterPath, [passportAuth], userController.updateUser);
router.delete(deleteUserRouterPath, [passportAuth], userController.deleteUser);
// router.post(loginRouterPath, userController.loginUser);

export { router };
