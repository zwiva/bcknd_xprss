import { Router } from 'express';

import { validateJournalistToken, validateSubscriptionToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/articles.controller.js';

const router = Router();
const PATH = '/articles';

router.get(`${PATH}`, validateSubscriptionToken, controller.getAll);
router.get(`${PATH}/:id`, controller.getOne);
router.get(`${PATH}/latest/:number`, controller.getLatest);
router.get(`${PATH}/section/:id`, validateSubscriptionToken, controller.getArticlesBySection);
router.post(`${PATH}`, validateJournalistToken, controller.create);

export default router;