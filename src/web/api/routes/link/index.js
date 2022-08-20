import { Router } from 'express';
import {
  newLinkRouterPath,
  allLinkRouterPath,
  getLinkRouterPath,
  updateLinkRouterPath,
  deleteLinkRouterPath,
} from '../constant';
import { linkController } from '../../controllers';
const router = Router();

router.post(newLinkRouterPath, linkController.registerLink);
router.get(allLinkRouterPath, linkController.getAllLink);
router.get(getLinkRouterPath, linkController.getLink);
router.put(updateLinkRouterPath, linkController.updateLink);
router.delete(deleteLinkRouterPath, linkController.deleteLink);

export { router };
