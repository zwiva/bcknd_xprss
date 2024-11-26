import { Router } from 'express';

import { validateJournalistToken, validateSubscriptionToken } from '../../../middlewares/authentication.middleware.js';
import controller from '../controllers/articles.controller.js';

const router = Router();
const PATH = '/articles';

router.get(`${PATH}`, validateSubscriptionToken, controller.getAll); // Si existe un token válido retorna todos los articulos de la plataforma ordenados por sección, de lo contrario devuelve solamente los tres últimos de cada sección
router.get(`${PATH}/:id`, controller.getOne); // Retorna el artículo según el "id" indicado
router.get(`${PATH}/section/latest/:number`, controller.getLatestFromEverySection); // Retorna los "n" últimos artículos de la plataforma ordenados por sección
router.get(`${PATH}/latest/:number`, validateSubscriptionToken, controller.getLatest); // Retorna los últimos artículos de la plataforma según la cantidad indicada
router.get(`${PATH}/section/:id`, validateSubscriptionToken, controller.getArticlesBySection); // Si existe token válido retorna todos los artículos de la sección indicada, de lo contrario retorna solamente los últimos tres de la sección indicada.
router.post(`${PATH}`, validateJournalistToken, controller.create); // Crea artículo si el rol corresponde a reportero o administrador
router.put(`${PATH}/:id`, validateJournalistToken, controller.update); // Actualiza artículo si el rol corresponde a reportero o administrador
router.delete(`${PATH}/:id`, validateJournalistToken, controller.remove); // Elimina artículo si el rol corresponde a reportero o administrador

export default router;