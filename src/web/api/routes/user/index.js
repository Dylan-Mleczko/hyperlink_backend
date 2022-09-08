import { Router } from 'express';
import {
  registerRouterPath,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
  loginRouterPath,
  logoutRouterPath,
  startResestPassword,
  endResestPassword,
} from '../constant';

import { userController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(registerRouterPath, userController.registerUser);
router.post(loginRouterPath, userController.login);
router.post(logoutRouterPath, userController.logout);
router.post(startResestPassword, userController.startResestPassword);
router.post(endResestPassword, userController.endResestPassword);

router.get(allUserRouterPath, [passportAuth], userController.getAllUser);
router.get(getUserRouterPath, [passportAuth], userController.getUser);
router.put(updateUserRouterPath, [passportAuth], userController.updateUser);
router.delete(deleteUserRouterPath, [passportAuth], userController.deleteUser);

export { router };
