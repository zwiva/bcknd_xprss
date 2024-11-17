import express from 'express';

import controller from '../controllers/auth.controller.js';

const PATH = '/auth';
const router = express.Router();

router.post(`${PATH}`, controller.login);

export default router;