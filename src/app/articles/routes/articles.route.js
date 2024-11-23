import { Router } from 'express';

import { validateJournalistToken, validateSubscriptionToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/articles.controller.js';

const router = Router();
const PATH = '/articles';

router.get(`${PATH}`, validateSubscriptionToken, controller.getAll); // Si tiene token trae todos los articulos de la plataforma, si no tiene token trae solamente los 3 ultimos
// router.get(`${PATH}/`, controller.getAll); // Si tiene token trae todos los articulos de la plataforma, si no tiene token trae solamente los 3 ultimos
router.get(`${PATH}/:id`, controller.getOne); // Trae un articulo
router.get(`${PATH}/section/latest/:number`, controller.getLatestBySection); // Trae los "n" ultimos articulos de la plataforma por cada seccion
router.get(`${PATH}/latest/:number`, validateSubscriptionToken, controller.getLatest); // Trae los ultimos articulos de la plataforma, tu indicas la cantidad
router.get(`${PATH}/section/:id`, validateSubscriptionToken, controller.getArticlesBySection); // Trae todos los articulos segun la seccion indicada
router.post(`${PATH}`, validateJournalistToken, controller.create); // Crea articulo


export default router;