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
  checkEmailExists,
  verifyEmail,
} from '../constant';

import { userController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';

const router = Router();

router.post(registerRouterPath, userController.registerUser);
router.post(loginRouterPath, userController.login);
router.get(logoutRouterPath, [passportAuth], userController.logout);
router.post(startResestPassword, userController.startResestPassword);
router.post(endResestPassword, userController.endResestPassword);
router.post(checkEmailExists, userController.checkEmailExists);
router.post(verifyEmail, userController.verifyEmail);

router.get(allUserRouterPath, [passportAuth], userController.getAllUser);
router.get(getUserRouterPath, [passportAuth], userController.getUser);
router.post(updateUserRouterPath, [passportAuth], userController.updateUser);
router.delete(deleteUserRouterPath, [passportAuth], userController.deleteUser);

export { router };
