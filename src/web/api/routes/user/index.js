import { Router } from 'express';
import { newUserRouterPath, allUserRouterPath } from '../constant';
import { userController } from '../../controllers';
const router = Router();

router.post(newUserRouterPath, userController.registerUser);
router.get(allUserRouterPath, userController.getAllUser);

export { router };
