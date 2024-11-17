import service from '../services/auth.service.js';

const login = async (req, res) => {
  const response = await service.login(req.body);
  return res.status(response.status).json(response); // final front
};

export default {
  login
}