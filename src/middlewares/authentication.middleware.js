import CONFIG from '../config/config.js';
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

const validateSubscriptionToken = (req, _, next) => { // El token del "headers.authorization" es almacenado en "req.user" solamente si existe y es válido, de lo contrario continua con el flujo
  try {
    const { status, user } = evaluateToken(req);
    if (status !== 200)
      return next();
    setReqUser(user, req, next);
  } catch (e) {
    next();
  }
}

const validateRequiredToken = (req, res, next) => { // El token del "headers.authorization" es almacenado en "req.user" solamente si existe y es válido, de lo contrario retorna un error interrumpiendo el flujo
  try {
    const { status, user } = evaluateToken(req);
    if (status !== 200)
      return res.status(status).json(handlerHttpResponse(status, null, 'Token inválido.'));
    setReqUser(user, req, next);
  } catch (e) {
    return res.status(403).json(handlerHttpResponse(409, null, `${e} at validateRequiredToken method on authentication.middleware file.`));
  }
}

const validateAdminToken = (req, res, next) => { // El token del "headers.authorization" es almacenado en "req.user" solamente si existe, es válido y es de rol "Administrador", de lo contrario retorna un error interrumpiendo el flujo
  try {
    const { status, user } = evaluateToken(req);
    if (status !== 200)
      return res.status(status).json(handlerHttpResponse(status, null, 'Token inválido.'));
    if (user.id_role !== CONFIG.DB_ADMIN_ROLE_ID)
      return res.status(403).json(handlerHttpResponse(403, null, 'Token inválido.'));
    setReqUser(user, req, next);
  } catch (e) {
    return res.status(403).json(handlerHttpResponse(409, null, `${e} at validateAdminToken method on authentication.middleware file.`));
  }
}

const validateJournalistToken = (req, res, next) => { // El token del "headers.authorization" es almacenado en "req.user" solamente si existe, es válido y es de rol "Reportero o Administrador", de lo contrario retorna un error interrumpiendo el flujo
  try {
    const { status, user } = evaluateToken(req);
    if (status !== 200)
      return res.status(status).json(handlerHttpResponse(status, null, 'Token inválido.'));
    if (user.id_role !== CONFIG.DB_JOURNALIST_ROLE_ID && user.id_role !== CONFIG.DB_ADMIN_ROLE_ID)
      return res.status(403).json(handlerHttpResponse(403, null, 'Token inválido.'));
    setReqUser(user, req, next);
  } catch (e) {
    return res.status(403).json(handlerHttpResponse(409, null, `${e} at validateJournalistToken method on authentication.middleware file.`));
  }
}

const evaluateToken = (req) => {
  try {
    const token = getAuthHeader(req.headers);
    if (!token)
      return { status: 401, user: null };
    const user = jwt.verifyToken(token, CONFIG.JWT_SECRET_KEY);
    if (!user || !user.id_user || !user.id_person || !user.id_role)
      return { status: 403, user };
    return { status: 200, user };
  } catch {
    return { status: 403, user: null };
  }
}

export {
  validateSubscriptionToken,
  validateRequiredToken,
  validateAdminToken,
  validateJournalistToken
}