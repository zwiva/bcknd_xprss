import { Router } from 'express';

import controller from '../controllers/sections.controller.js';

const PATH = '/sections';
const router = Router();

router.get(`${PATH}`, controller.getAll);
router.get(`${PATH}/:id`, controller.getOne);

export default router;