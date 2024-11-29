import { Router } from 'express';

import { validateAdminToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/users.controller.js';

const router = Router();
const PATH = '/users';

router.get(`${PATH}`, validateAdminToken, controller.getAll);
router.get(`${PATH}/:id`, validateAdminToken, controller.getOne);
router.post(`${PATH}`, validateAdminToken, controller.create);
router.put(`${PATH}/:id`, validateAdminToken, controller.update);
router.delete(`${PATH}/:id`, validateAdminToken, controller.remove);

export default router;