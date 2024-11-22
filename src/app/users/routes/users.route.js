import { Router } from 'express';

import { validateRequiredToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/users.controller.js';

const PATH = '/users';
const router = Router();

router.get(`${PATH}`, validateRequiredToken, controller.getAll);
router.post(`${PATH}`, validateRequiredToken, controller.create);

export default router;