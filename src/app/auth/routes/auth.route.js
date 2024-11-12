import express from 'express';
import controller from '../controllers/auth.controller.js';
const router = express.Router();
const PATH = '/auth/'

router.post(`${PATH}`, controller.login);

export default router;