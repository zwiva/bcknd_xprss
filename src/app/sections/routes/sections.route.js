import { Router } from 'express';

import controller from '../controllers/sections.controller.js';

const router = Router();
const PATH = '/sections';

router.get(`${PATH}`, controller.getAll);
router.get(`${PATH}/:id`, controller.getOne);

export default router;