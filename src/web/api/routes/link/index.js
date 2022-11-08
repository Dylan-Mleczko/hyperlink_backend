import { Router } from 'express';
import {
  newLinkRouterPath,
  allLinkRouterPath,
  getLinkRouterPath,
  updateLinkRouterPath,
  deleteLinkRouterPath,
  scrapeLinkRouterPath,
} from '../constant';
import { linkController } from '../../controllers';
import { passportAuth } from '../../../middleware/auth';
const router = Router();

router.post(scrapeLinkRouterPath, linkController.scrapeLink);
router.post(newLinkRouterPath, [passportAuth], linkController.addLink);
router.get(allLinkRouterPath, [passportAuth], linkController.getAllLink);
router.get(getLinkRouterPath, [passportAuth], linkController.getLink);
router.put(updateLinkRouterPath, [passportAuth], linkController.updateLink);
router.delete(deleteLinkRouterPath, [passportAuth], linkController.deleteLink);

export { router };
