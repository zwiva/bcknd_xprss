
import config from '../config/config.js';
import jwt from '../shared/services/jwt.service.js';
import { handlerHttpResponse } from '../shared/services/utils.service.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      return res.status(401).json(handlerHttpResponse(401, null, 'Token inexistente'));
    const user = jwt.verifyToken(token, config.JWT_SECRET_KEY);
    if (!user?.id_user || !user?.id_role || !user?.id_person)
      return res.status(403).json(handlerHttpResponse(403, null, 'Token inválido'));
    req.user = user;
    next();
  } catch (e) {
    return res.status(409).json(handlerHttpResponse(409, null, `${e} at authenticateToken method on authentication.middleware file`));
  }
};