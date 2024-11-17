import express from 'express';

import { authenticateToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/users.controller.js';

const PATH = '/users/';
const router = express.Router();

router.get(`${PATH}`, authenticateToken, controller.getAll);
router.post(`${PATH}`, authenticateToken, controller.create);

export default router;