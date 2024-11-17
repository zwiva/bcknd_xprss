import jwt from 'jsonwebtoken';

export const signData = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '72h' });
  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}