import express from 'express';
import controller from '../controllers/users.controller.js';
const router = express.Router();
const PATH = '/users/';

router.get(`${PATH}`, controller.getAll);
router.post(`${PATH}`, controller.create);

export default router;