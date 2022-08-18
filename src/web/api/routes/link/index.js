import { Router } from 'express';
import { newLinkRouterPath, allLinkRouterPath } from '../constant';
import { linkController } from '../../controllers';
const router = Router();

router.post(newLinkRouterPath, linkController.registerLink);
router.get(allLinkRouterPath, linkController.getAllLink);

export { router };
