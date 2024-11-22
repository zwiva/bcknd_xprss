import service from '../services/auth.service.js';

const login = async (req, res) => {
  const response = await service.login(req.body);
  res.status(response.status).json(response);
}

const register = async () => {
  const response = await service.register(req.body);
  res.status(response.status).json(response);
}

export default {
  login,
  register
}