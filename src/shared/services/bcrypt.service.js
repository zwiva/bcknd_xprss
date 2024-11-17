import { hash, compare } from 'bcrypt';

import config from '../../config/config.js';

const hashData = async (data) => {
  return await hash(data, config.BCRYPT_SALT);
}

const compareEncrypted = async (data, encrypted) => {
  return await compare(data, encrypted);
}

export default {
  hashData,
  compareEncrypted
}