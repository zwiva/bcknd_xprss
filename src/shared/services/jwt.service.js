import jwt from 'jsonwebtoken';

import config from '../../config/config.js';

const signData = (data) => {
  const token = jwt.sign(data, config.JWT_SECRET_KEY, { expiresIn: config.JWT_EXPIRATION });
  return token;
}

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET_KEY);
}

export default {
  signData,
  verifyToken
}