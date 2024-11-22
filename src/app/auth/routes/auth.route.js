import { Router } from 'express';

import controller from '../controllers/auth.controller.js';

const PATH = '/auth';
const router = Router();

router.post(`${PATH}`, controller.login);
router.post(`${PATH}/register`, controller.register);

export default router;