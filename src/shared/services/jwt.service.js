import jwt from 'jsonwebtoken';

import CONFIG from '../../config/config.js';

const signData = (data) => {
  const token = jwt.sign(data, CONFIG.JWT_SECRET_KEY, { expiresIn: CONFIG.JWT_EXPIRATION });
  return token;
}

const verifyToken = (token) => {
  return jwt.verify(token, CONFIG.JWT_SECRET_KEY);
}

export default {
  signData,
  verifyToken
}