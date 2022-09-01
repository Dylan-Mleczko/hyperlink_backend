import { Router } from 'express';
import {
  newLinkRouterPath,
  allLinkRouterPath,
  getLinkRouterPath,
  updateLinkRouterPath,
  deleteLinkRouterPath,
} from '../constant';
import { linkController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(newLinkRouterPath, [passportAuth], linkController.registerLink);
router.get(allLinkRouterPath, [passportAuth], linkController.getAllLink);
router.get(getLinkRouterPath, [passportAuth], linkController.getLink);
router.put(updateLinkRouterPath, [passportAuth], linkController.updateLink);
router.delete(deleteLinkRouterPath, [passportAuth], linkController.deleteLink);

export { router };
