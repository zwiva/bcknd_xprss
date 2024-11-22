import { Router } from 'express';

import { validateSubscriptionToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/articles.controller.js';

const PATH = '/articles';
const router = Router();

router.get(`${PATH}`, validateSubscriptionToken, controller.getAll);
router.get(`${PATH}/:id`, validateSubscriptionToken, controller.getOne);
router.get(`${PATH}/section/:id`, validateSubscriptionToken, controller.getAllBySection);
router.post(`${PATH}`, validateSubscriptionToken, controller.create);

export default router;