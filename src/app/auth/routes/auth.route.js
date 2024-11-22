import { Router } from 'express';

import controller from '../controllers/auth.controller.js';

const router = Router();
const PATH = '/auth';

router.post(`${PATH}`, controller.login);
router.post(`${PATH}/register`, controller.register);

export default router;