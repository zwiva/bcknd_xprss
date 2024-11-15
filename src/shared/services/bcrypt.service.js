import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';
const BASIC_SALT = 5;

const hash = async (data) => {
  return await bcryptHash(data, BASIC_SALT);
}

const compare = async (data, encrypted) => {
  return await bcryptCompare(data, encrypted);
}

export default {
  hash,
  compare
}