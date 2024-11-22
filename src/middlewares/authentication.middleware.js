import config from '../config/config.js';
import jwt from '../shared/services/jwt.service.js';
import { handlerHttpResponse } from '../shared/services/utils.service.js';

const getAuthHeader = (headers) => {
  const authHeader = headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
}

const setReqUser = (user, req, next) => {
  req.user = user;
  next();
}

const validateRequiredToken = (req, res, next) => {
  try {
    const token = getAuthHeader(req.headers);
    if (!token)
      return res.status(401).json(handlerHttpResponse(401, null, 'Token inexistente.'));
    const user = jwt.verifyToken(token, config.JWT_SECRET_KEY);
    if (!user?.id_user || !user?.id_role || !user?.id_person)
      return res.status(403).json(handlerHttpResponse(403, null, 'Token inválido.'));
    setReqUser(user, req, next);
  } catch (e) {
    return res.status(409).json(handlerHttpResponse(409, null, `${e} at authenticateToken method on authentication.middleware file.`));
  }
}

const validateSubscriptionToken = (req, _, next) => {
  try {
    const token = getAuthHeader(req.headers);
    if (!token)
      return next();
    const user = jwt.verifyToken(token, config.JWT_SECRET_KEY);
    if (!user?.id_user || !user?.id_role || !user?.id_person)
      return next();
    setReqUser(user, req, next);
  } catch (e) {
    next();
  }
}

export {
  validateRequiredToken,
  validateSubscriptionToken
}